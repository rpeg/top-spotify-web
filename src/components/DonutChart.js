import React from "react";
import { countBy } from "lodash";
import CanvasJSReact from "../assets/canvasjs.react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DonutChart = ({ genres }) => {
  const freqDict = countBy(genres, each => {
    return each;
  });

  let arr = [];
  for (let key in freqDict) {
    arr[arr.length] = { y: freqDict[key], label: key };
  }

  const sortedGenres = arr.sort((a, b) => (b.y > a.y ? 1 : -1));

  console.log(sortedGenres);

  return (
    <div>
      <CanvasJSChart
        options={{
          title: {
            text: "Genres"
          },
          data: [
            {
              type: "doughnut",
              startAngle: 60,
              indexLabelFontSize: 17,
              //innerRadius: 60,
              indexLabel: "{label} - #percent%",
              toolTipContent: "<b>{label}:</b> {y} (#percent%)",
              dataPoints: sortedGenres.slice(0, 15)
            }
          ]
        }}
      />
    </div>
  );
};

export default DonutChart;
