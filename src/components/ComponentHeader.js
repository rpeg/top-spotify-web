import React from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ComponentHeader = ({ title }) => (
  <Row style={{ padding: '2em 0 0 0' }}>
    <div>
      <p
        className="text-l"
        style={{
          textAlign: 'left', fontWeight: 'bold', marginBottom: '0', paddingLeft: '.1em',
        }}
      >
        {title}
      </p>
    </div>
    <div style={{ width: '100%' }}>
      <hr style={{ borderTop: '1px solid #fff', margin: '0 0 2em 0' }} />
    </div>
  </Row>
);

ComponentHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ComponentHeader;
