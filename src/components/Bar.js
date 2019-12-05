import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import { makeSortedFrequencyArr } from '../lib/frequency';

const Bar = ({ items }) => {
  const sortedItems = makeSortedFrequencyArr(items);

  return (
    <ProgressBar style={{ height: '40px', backgroundColor: '#191414' }}>
      {sortedItems.map((item, i) => (
        <ProgressBar
          key={item.name}
          style={{ color: 'white', backgroundColor: `rgba(29, 185, 84, ${1 - (i * (1 / sortedItems.length))})` }}
          now={100 * (item.freq / items.length)}
          label={item.name}
        />
      ))}
    </ProgressBar>
  );
};

Bar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Bar;
