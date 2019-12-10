import React from 'react';

const Splash = () => (
  <div className="splash">
    <div className="splash-header">
      <p className="text-xl splash-title">Spotify Data Visualizer</p>
      <p className="text-l splash-desc">
        Create a custom chart displaying your Spotify data, including top artists, tracks, genres, and stats.
      </p>
    </div>
    <div
      className="splash-example"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(25, 20, 20, 0.5), rgba(25, 20, 20, 1)), 
          url(${process.env.PUBLIC_URL}images/example-chart.png`,
      }}
    />
  </div>
);

export default Splash;
