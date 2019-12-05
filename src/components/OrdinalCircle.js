import React from 'react';
import PropTypes from 'prop-types';

const OrdinalCircle = ({ position }) => (
  <div
    style={{
      position: 'absolute',
      zIndex: '25',
      top: '-10px',
      left: '-10px',
      width: '20px',
      height: '20px',
      fontSize: '12px',
      fontWeight: 'bold',
      border: '1px solid white',
      borderRadius: '12px',
      textAlign: 'center',
      background: '#191414',
    }}
  >
    {position}
  </div>
);

OrdinalCircle.propTypes = {
  position: PropTypes.number.isRequired,
};

export default OrdinalCircle;
