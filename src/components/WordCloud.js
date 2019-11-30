import React from 'react';
import Palette from 'google-palette';
import ReactWordcloud from 'react-wordcloud';
import { Row } from 'react-bootstrap';

import { makeSortedFrequencyArr } from '../lib/frequency';

const WordCloud = ({ genres, count }) => {
  const sortedGenres = makeSortedFrequencyArr(genres).slice(0, count);

  const words = sortedGenres.map((genre, i) => ({
    text: genre.name,
    value: genre.freq,
  }));

  const colors = Palette('tol-rainbow', count).map((c) => `#${c}`);

  const options = {
    colors,
    enableTooltip: true,
    deterministic: false,
    fontFamily: 'Karla, sans-serif',
    fontSizes: [10, 48],
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
    count > 0 && (
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

export default WordCloud;
