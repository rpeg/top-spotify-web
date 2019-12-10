import React from 'react';
import { useSelector } from 'react-redux';
import { mean, mode } from 'mathjs';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import Radar from './Radar';
import Statistic from './Statistic';
import Bar from './Bar';
import Donut from './Donut';
import { selectStatsOptions } from '../reducers/selectors';

const getMode = (items) => mode(items)[0];
const getMean = (items) => mean(items);

const getKey = (pitch) => {
  const letters = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];

  return letters[pitch % 12];
};

const Statistics = ({ features, tracks }) => {
  const statsOptions = useSelector(selectStatsOptions);

  return (
    <div>
      <Row>
        {statsOptions.includes('key') && features.length > 0 && (
        <Col xs={4}>
          <Statistic
            title="Favorite Key"
          >
            <div>
              <p className="text-l">{getKey(getMode(features.map((f) => f.key)))}</p>
            </div>
          </Statistic>
        </Col>
        )}
        {statsOptions.includes('bpm') && features.length > 0 && (
        <Col xs={4}>
          <Statistic
            title="Avg. BPM"
          >
            <div>
              <p className="text-l">{getMean(features.map((f) => f.tempo)).toFixed(1)}</p>
            </div>
          </Statistic>
        </Col>
        )}
        {statsOptions.includes('scale') && features.length > 0 && (
        <Col xs={4}>
          <Statistic
            title="Scales"
          >
            <Row>
              <Col>
                <div>
                  <Bar items={features.map((f) => `${f.mode ? 'Major' : 'Minor'}`)} />
                </div>
              </Col>
            </Row>
          </Statistic>
        </Col>
        )}
      </Row>
      <Row>
        {statsOptions.includes('decades') && (
          <Col xs={12} md={4}>
            <Statistic title="Decades">
              <Row className="justify-content-center">
                <Col xs={9} md={12}>
                  <Donut
                    items={tracks.map((t) => `${t.album.release_date[2]}0s`)}
                  />
                </Col>
              </Row>
            </Statistic>
          </Col>
        )}
        {statsOptions.includes('features') && (
          <Col xs={12} md={8}>
            <Statistic title="Features">
              <Radar features={features} />
            </Statistic>
          </Col>
        )}
      </Row>
    </div>
  );
};

Statistics.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object),
  tracks: PropTypes.arrayOf(PropTypes.object),
};

Statistics.defaultProps = {
  features: [],
  tracks: [],
};

export default Statistics;
