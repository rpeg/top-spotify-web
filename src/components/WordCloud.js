import React from "react";
import Palette from "google-palette";
import { countBy } from "lodash";
import ReactWordcloud from "react-wordcloud";

import ComponentHeader from "./ComponentHeader";

const WordCloud = ({ genres, count }) => {
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

  const words = sortedGenres.map((genre, i) => ({
    text: genre.name,
    value: genre.freq
  }));

  const colors = Palette("tol-rainbow", count).map(c => "#" + c);

  const options = {
    colors: colors,
    enableTooltip: true,
    deterministic: false,
    fontFamily: "DM Sans, sans-serif",
    fontSizes: [10, 48],
    fontStyle: "normal",
    fontWeight: "bold",
    padding: 1,
    rotations: 2,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000
  };

  return (
    <div>
      <ComponentHeader title="Top genres" />
      <div
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          height: "100%",
          width: "auto"
        }}
      >
        <ReactWordcloud options={options} words={words} />
      </div>
    </div>
  );
};

export default WordCloud;
