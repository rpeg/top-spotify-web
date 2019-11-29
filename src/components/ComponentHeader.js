import React from 'react';
import { Row } from 'react-bootstrap';

const ComponentHeader = ({ title }) => (
  <Row style={{ paddingTop: '2em' }}>
    <h3 style={{
      textAlign: 'left', backgroundColor: '#FFFFFF', color: '#191414', padding: '0 .25em 0 .25em',
    }}
    >
      {title}
    </h3>
  </Row>
);

export default ComponentHeader;
