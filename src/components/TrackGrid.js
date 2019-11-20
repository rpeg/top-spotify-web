import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { uniqBy } from "lodash";

import "./TrackGrid.css";

const TrackGrid = ({ tracks, title, count }) => {
  // Isolate top [count] tracks from unique albums
  const uniqueTracks = uniqBy(tracks, "album.id").slice(0, count);

  console.log(uniqueTracks);

  return (
    <div>
      <h2>{title}</h2>
      <Container className="track-grid">
        <ul style={{ listStyleType: "none" }}>
          {uniqueTracks.map((track, i) => (
            <Row key={i}>
              <Col md={8}>
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