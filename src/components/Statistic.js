import React from "react";

const Statistic = ({ title, children }) => {
  return (
    <div>
      <div>
        <p>{title}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Statistic;
