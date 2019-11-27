import { countBy } from "lodash";

const makeSortedFrequencyArr = items => {
  const freqDict = countBy(items, each => {
    return each;
  });

  let arr = [];
  for (let key in freqDict) {
    arr[arr.length] = { freq: freqDict[key], name: key };
  }

  return arr.sort((a, b) => (b.freq > a.freq ? 1 : -1));
};

export { makeSortedFrequencyArr };
