import React from 'react';
import PropTypes from 'prop-types';

const Statistic = ({ title, children }) => (
  <div>
    {title && (
      <div style={{ textAlign: 'start' }}>
        <p className="text-m stat-title">{title}</p>
      </div>
    )}
    <div className="stat-content">{children}</div>
  </div>
);

Statistic.propTypes = {
  title: PropTypes.string,
  children: PropTypes.shape({}),
};

Statistic.defaultProps = {
  title: '',
  children: {},
};

export default Statistic;
