import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Profile from "./Profile";

const MainHeader = () => {
  return (
    <Container>
      <Row>
        <Col xs={6} style={{ padding: "0", display: "inline-flex" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center"
            }}
          >
            <img
              style={{ height: "50px", width: "auto" }}
              src={process.env.PUBLIC_URL + "/Spotify_Icon_RGB_Green.png"}
              alt="Spotify Logo"
            />
            <h1 style={{ width: "auto", margin: "0 0 0 0.5em" }}>
              My Top Music
            </h1>
          </span>
        </Col>
        <Col xs={6} style={{ padding: "0", display: "inline-flex" }}>
          <Profile />
        </Col>
      </Row>
    </Container>
  );
};

export default MainHeader;
