import React from 'react';

const ExampleChart = () => (
  <div className="splash">
    <div className="splash-header">
      <h1 className="splash-title">Spotify Data Visualizer</h1>
      <p className="splash-desc">
        Create a custom chart displaying your Spotify data, including top artists, tracks, genres, and stats.
      </p>
    </div>
    <div
      className="splash-example"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(25, 20, 20, 0.3), rgba(25, 20, 20, 1)), 
          url(${process.env.PUBLIC_URL}images/example-chart.png`,
      }}
    />
  </div>
);

export default ExampleChart;
