import React from 'react';
import PieChart from 'react-minimal-pie-chart';
import Palette from 'google-palette';

import { makeSortedFrequencyArr } from '../lib/frequency';

const Donut = ({ items }) => {
  const sortedItems = makeSortedFrequencyArr(items);

  const colors = Palette('tol-rainbow', sortedItems.length).map((c) => `#${c}`);

  const data = sortedItems.map((item, i) => ({
    color: colors[i],
    title: item.name,
    value: item.freq,
  }));

  return (
    <div>
      <PieChart
        className="minimal-pie"
        animate
        animationDuration={750}
        animationEasing="ease-out"
        cx={50}
        cy={50}
        data={data}
        label={({ data, dataIndex }) => data[dataIndex].title}
        labelPosition={60}
        labelStyle={{
          fontFamily: 'Karla, sans-serif',
          fontSize: '5px',
        }}
        lengthAngle={360}
        lineWidth={20}
        onClick={undefined}
        onMouseOut={undefined}
        onMouseOver={undefined}
        paddingAngle={0}
        radius={50}
        ratio={1}
        rounded={false}
        startAngle={0}
      />
    </div>
  );
};

export default Donut;
