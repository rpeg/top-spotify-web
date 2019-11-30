import React from 'react';
import { Radar as RadarChart } from 'react-chartjs-2';


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
    gridLines: {
      display: false,
    },
    scale: {
      ticks: {
        display: false,
        beginAtZero: true,
        max: 1,
        min: 0,
        stepSize: 1,
      },
      pointLabels: {
        fontFamily: 'Karla, sans-serif',
        fontSize: 14,
        fontColor: 'white',
      },
      gridLines: {
        color: 'rgba(255, 255, 255, .5)',
      },
    },
    legend: {
      display: false,
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: undefined,
        backgroundColor: 'rgba(29, 185, 84, 0.1)',
        borderColor: 'rgba(29, 185, 84, 1)',
        pointBackgroundColor: 'rgba(29, 185, 84,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(29, 185, 84,1)',
        data: labels.map((l) => getFeatureAvg(features, l)),
      },
    ],
  };

  return (
    <div>
      <RadarChart data={data} options={options} />
    </div>
  );
};

export default Radar;
