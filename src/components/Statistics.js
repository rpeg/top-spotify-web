import React from "react";
import { mean, mode } from "mathjs";

import ComponentHeader from "./ComponentHeader";
import Radar from "./Radar";
import { Container, Row, Col } from "react-bootstrap";
import Statistic from "./Statistic";
import RadialBar from "./RadialBar";
import Donut from "./Donut";

const getMode = items => mode(items)[0];
const getMean = items => mean(items);

const getKey = pitch => {
  const letters = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B"
  ];

  return letters[pitch % 12];
};

const Statistics = ({ features, tracks }) => {
  return (
    <div>
      <ComponentHeader title="Statistics" />
      <Container>
        <Row>
          <Col>
            <Statistic
              title="Most Frequent Key"
              children={<h4>{getKey(getMode(features.map(f => f.key)))}</h4>}
            />
          </Col>
          <Col>
            <Statistic
              title="Average BPM"
              children={<h4>{getMean(features.map(f => f.tempo))}</h4>}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Statistic
              title="Scale"
              children={<RadialBar items={features.map(f => f.mode)} />}
            />
          </Col>
          <Col>
            <Statistic
              title="Decades"
              children={
                <Donut
                  items={tracks.map(t => t.album.release_date[2] + "0s")}
                />
              }
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Radar features={features} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Statistics;
