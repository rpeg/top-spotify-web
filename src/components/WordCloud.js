import React from 'react';
import Palette from 'google-palette';
import ReactWordcloud from 'react-wordcloud';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import { makeSortedFrequencyArr } from '../lib/frequency';

const WordCloud = ({ genres, count }) => {
  const sortedGenres = makeSortedFrequencyArr(genres).slice(0, count);

  const words = sortedGenres.map((genre) => ({
    text: genre.name,
    value: genre.freq,
  }));

  const colors = Palette('tol-rainbow', count).map((c) => `#${c}`);

  const options = {
    colors,
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'Karla, sans-serif',
    fontSizes: [8, 48],
    fontStyle: 'normal',
    fontWeight: 'bold',
    padding: 1,
    rotations: 2,
    rotationAngles: [0, 90],
    scale: 'sqrt',
    spiral: 'archimedean',
    transitionDuration: 1000,
  };

  return (
    genres.length > 0 && count > 0 && (
      <Row>
        <div
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          <ReactWordcloud options={options} words={words} />
        </div>
      </Row>
    )
  );
};

WordCloud.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  count: PropTypes.number.isRequired,
};

export default WordCloud;
