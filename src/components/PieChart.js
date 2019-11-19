import React from "react";
import { countBy } from "lodash";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import Palette from "google-palette";
import { Container, Row, Col } from "react-bootstrap";

import "./PieChart.css";

const PieChart = ({ genres, count }) => {
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

  const colors = Palette("tol-rainbow", count).map(c => "#" + c);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <ReactMinimalPieChart
            className="minimal-pie"
            animate
            animationDuration={750}
            animationEasing="ease-out"
            cx={50}
            cy={50}
            data={sortedGenres.map((genre, i) => ({
              color: colors[i],
              title: genre.name,
              value: genre.freq
            }))}
            label={({ data, dataIndex }) => data[dataIndex].title}
            labelPosition={105}
            labelStyle={{
              fontFamily: "sans-serif",
              fontSize: "3px"
            }}
            lengthAngle={360}
            lineWidth={25}
            onClick={undefined}
            onMouseOut={undefined}
            onMouseOver={undefined}
            paddingAngle={0}
            radius={42}
            ratio={1}
            rounded={false}
            startAngle={0}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PieChart;
