import React from 'react';

const Statistic = ({ title, children }) => (
  <div>
    {title && (
      <div className="stat-title" style={{ textAlign: 'start' }}>
        <p>{title}</p>
      </div>
    )}
    <div className="stat-content">{children}</div>
  </div>
);

export default Statistic;
