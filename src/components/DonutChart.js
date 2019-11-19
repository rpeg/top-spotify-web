import React from "react";
import { countBy } from "lodash";
import { Doughnut } from "react-chartjs-2";
import palette from "google-palette";

const DonutChart = ({ genres, count }) => {
  const freqDict = countBy(genres, each => {
    return each;
  });

  let arr = [];
  for (let key in freqDict) {
    arr[arr.length] = { freq: freqDict[key], name: key };
  }

  const sortedGenres = arr
    .sort((a, b) => (b.freq > a.freq ? 1 : -1))
    .slice(0, count);

  const colors = palette("tol-rainbow", count).map(c => "#" + c);

  const data = {
    datasets: [
      {
        data: sortedGenres.map(g => g.freq),
        backgroundColor: colors
      }
    ],

    labels: sortedGenres.map(g => g.name)
  };

  console.log(sortedGenres);

  return <Doughnut data={data} />;
};

export default DonutChart;
