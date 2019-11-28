import React from 'react';
import Chart from 'react-apexcharts';

const getFeatureAvg = (features, name) => {
  const featureArr = features.map((f) => f[name]);
  const total = featureArr.reduce((acc, curr) => acc + curr);

  return total / features.length;
};

const Radar = ({ features }) => {
  const labels = [
    'acousticness',
    'danceability',
    'energy',
    'instrumentalness',
    'liveness',
    'speechiness',
    'valence',
  ];

  const options = {
    labels,
    yaxis: {
      min: 0,
      max: 1,
      show: false,
    },
    chart: {
      foreColor: '#FFFFFF',
      fontFamily: 'Karla, sans-serif',
      toolbar: {
        show: false,
      },
    },
  };

  const series = [
    {
      data: labels.map((l) => getFeatureAvg(features, l)),
    },
  ];

  return (
    <div>
      <Chart type="radar" options={options} series={series} />
    </div>
  );
};

export default Radar;
