import React from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ComponentHeader = ({ title }) => (
  <Row style={{ padding: '2em 0 0 0' }}>
    <h3 style={{
      textAlign: 'left', backgroundColor: '#FFFFFF', color: '#191414', padding: '0 .25em 0 .25em',
    }}
    >
      {title}
    </h3>
  </Row>
);

ComponentHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ComponentHeader;
