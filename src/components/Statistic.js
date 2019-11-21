import React from "react";

const Statistic = ({ title, stat }) => {
  return (
    <div>
      <div>
        <p>{title}</p>
      </div>
      <div>
        <h4>{stat}</h4>
      </div>
    </div>
  );
};

export default Statistic;
