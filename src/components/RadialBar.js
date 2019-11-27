import React from "react";
import Chart from "react-apexcharts";
import { makeSortedFrequencyArr } from "../lib/frequency";

const RadialBar = ({ items }) => {
  const sortedItems = makeSortedFrequencyArr(items);
  const topItemType = sortedItems[0];
  const topItemPercent = 100 * (topItemType.freq / items.length);

  console.log(sortedItems);

  const options = {
    plotOptions: {
      radialBar: {
        hollow: {
          size: topItemPercent
        }
      }
    },
    labels: [topItemType.name ? "Major" : "Minor"],
    fill: {
      colors: ["#1DB954"]
    }
  };

  const series = [topItemPercent];

  return (
    <div>
      <Chart type="radialBar" options={options} series={series} />
    </div>
  );
};

export default RadialBar;
