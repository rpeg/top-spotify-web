import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { uniqBy } from "lodash";
import ComponentHeader from "./ComponentHeader";

import "./TrackGrid.css";

const TrackGrid = ({ tracks, count }) => {
  // Isolate top [count] tracks from unique albums
  const uniqueTracks = uniqBy(tracks, "album.id").slice(0, count);

  console.log(uniqueTracks);

  return (
    <div>
      <ComponentHeader title="Top tracks" />
      <Container className="track-grid">
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {uniqueTracks.map((track, i) => (
            <Row key={i}>
              <Col style={{ padding: "0" }}>
                <li>
                  <div style={{ float: "left" }}>
                    <img
                      height="50"
                      width="50"
                      src={track.album.images[0].url}
                      alt={track.name}
                      style={{ objectFit: "cover" }}
                    />
                    <span style={{ marginLeft: "1em" }}>
                      <b>{track.artists[0].name}</b> - {track.name}
                    </span>
                  </div>
                </li>
              </Col>
            </Row>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default TrackGrid;
