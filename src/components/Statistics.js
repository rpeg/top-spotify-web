import React from 'react';
import { useSelector } from 'react-redux';
import { mean, mode } from 'mathjs';

import { Row, Col } from 'react-bootstrap';
import Radar from './Radar';
import Statistic from './Statistic';
import RadialBar from './RadialBar';
import Donut from './Donut';

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
  const statsOptions = useSelector((state) => state.statsOptions);

  return (
    <div>
      <Row>
        {statsOptions.includes('key') && (
        <Col>
          <Statistic
            title="Most Frequent Key"
          >
            <h4>{getKey(getMode(features.map((f) => f.key)))}</h4>
          </Statistic>
        </Col>
        )}
        {statsOptions.includes('bpm') && (
        <Col>
          <Statistic
            title="Average BPM"
          >
            <h4>{getMean(features.map((f) => f.tempo))}</h4>
          </Statistic>
        </Col>
        )}
      </Row>
      <Row>
        {statsOptions.includes('scale') && (
        <Col>
          <Statistic
            title="Scale"
          >
            <RadialBar items={features.map((f) => f.mode)} />

          </Statistic>
        </Col>
        )}
        {statsOptions.includes('decades') && (
        <Col>
          <Statistic
            title="Decades"
          >
            <Donut
              items={tracks.map((t) => `${t.album.release_date[2]}0s`)}
            />
          </Statistic>
        </Col>
        )}
      </Row>
      <Row>
        {statsOptions.includes('features') && (
        <Col xs={12}>
          <Radar features={features} />
        </Col>
        )}
      </Row>
    </div>
  );
};

export default Statistics;
