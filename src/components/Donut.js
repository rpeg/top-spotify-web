import React from "react";
import Chart from "react-apexcharts";
import { makeSortedFrequencyArr } from "../lib/frequency";

const Donut = ({ items }) => {
  const sortedItems = makeSortedFrequencyArr(items);

  const options = {
    responsive: [
      {
        breakpoint: 250,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      }
    ],
    labels: sortedItems.map(i => i.name),
    dataLabels: {
      enabled: false
    }
  };

  const series = sortedItems.map(i => i.freq);

  return (
    <div>
      <Chart type="donut" options={options} series={series} />
    </div>
  );
};

export default Donut;
