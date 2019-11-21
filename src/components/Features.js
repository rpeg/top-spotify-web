import React from "react";
import { mode } from "mathjs";

import ComponentHeader from "./ComponentHeader";
import Radar from "./Radar";
import { Container, Row, Col } from "react-bootstrap";
import Statistic from "./Statistic";

const getMode = items => mode(items)[0];

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

const Features = ({ features }) => {
  return (
    <div>
      <ComponentHeader title="Features" />
      <Container>
        <Row>
          <Col>
            <h5>Most Frequent</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <Statistic
              title="Key"
              stat={getKey(getMode(features.map(f => f.key)))}
            />
          </Col>
          <Col>
            <Statistic title="Mode" stat={getMode(features.map(f => f.mode) ? "Major" : "Minor")} />
          </Col>
          <Col>
            <Statistic
              title="Time Signature"
              stat={getMode(features.map(f => f.time_signature))}
            />
          </Col>
          <Col>
            <Statistic title="BPM" stat={getMode(features.map(f => f.tempo))} />
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

export default Features;
