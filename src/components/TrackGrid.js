import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { uniqBy } from "lodash";
import ComponentHeader from "./ComponentHeader";

import "./TrackGrid.css";
import OrdinalCircle from "./OrdinalCircle";

const TrackGrid = ({ tracks, count }) => {
  // Isolate top [count] tracks from unique albums
  const uniqueTracks = uniqBy(tracks, "album.id").slice(0, count);

  return (
    <div>
      <ComponentHeader title="Tracks" />
      <Container className="track-grid">
        <ul style={{ listStyleType: "none", padding: "0", marginTop: "1em" }}>
          {uniqueTracks.map((track, i) => (
            <Row key={i} style={{ marginTop: "1em" }}>
              <Col style={{ padding: "0" }}>
                <li>
                  <div style={{ display: "inline-flex", float: "left" }}>
                    <img
                      height="50"
                      width="50"
                      src={track.album.images[0].url}
                      alt={track.name}
                      style={{ objectFit: "cover" }}
                    />
                    <OrdinalCircle position={i + 1} />
                    <div style={{ marginLeft: "0.5em" }}>
                      <div>
                        <p
                          style={{
                            margin: "0",
                            textAlign: "left"
                          }}
                        >
                          <b>{track.artists[0].name}</b>
                        </p>
                      </div>
                      <div>
                        <p
                          style={{
                            margin: "0",
                            textAlign: "left"
                          }}
                        >
                          {track.name}
                        </p>
                      </div>
                    </div>
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
