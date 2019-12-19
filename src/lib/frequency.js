import { countBy } from 'lodash';

const makeSortedFrequencyArr = (items) => {
  const freqDict = countBy(items, (each) => each);

  const arr = [];

  Object.keys(freqDict).forEach((key) => {
    arr[arr.length] = { freq: freqDict[key], name: key };
  });

  return arr.sort((a, b) => (b.freq > a.freq ? 1 : -1));
};

// eslint-disable-next-line import/prefer-default-export
export { makeSortedFrequencyArr };
