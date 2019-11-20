import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Profile from "./Profile";

const MainHeader = () => {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          margin: "1em auto 0 1em"
        }}
      >
        <img
          style={{ height: "50px", width: "auto" }}
          src={process.env.PUBLIC_URL + "/Spotify_Icon_RGB_Green.png"}
          alt="Spotify Logo"
        />
        <h1 style={{ width: "auto", margin: "0 0 0 0.5em"}}>My Top Music</h1>
      </span>

      <Profile />
    </div>
  );
};

export default MainHeader;
