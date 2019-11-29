import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { uniqBy, chunk } from 'lodash';
import ComponentHeader from './ComponentHeader';

import './TrackGrid.css';
import OrdinalCircle from './OrdinalCircle';

const NUM_PER_ROW = 15;
const NUM_PER_COL = 5;

const TrackGrid = ({ tracks, count }) => {
  // Isolate top [count] tracks from unique albums; default to tracks array
  const uniqueTracks = uniqBy(tracks, 'album.id').slice(0, count);
  const tracksToMap = uniqueTracks.length >= count ? uniqueTracks : tracks;

  const tracksByRow = chunk(tracksToMap, NUM_PER_ROW);

  return (
    count > 0 ? (
      <div>
        <ComponentHeader title="Tracks" />
        <Container className="track-grid">
          {tracksByRow.map((rowTracks, i) => (
            <div>
              <Row>
                {i > 0 && (
                  <hr style={{ marginBottom: '0', border: '1px solid rgba(255,255,255,.1)', width: '100%' }} />
                )}
              </Row>
              <Row key={rowTracks.map((t) => t.id).join()} style={{ marginTop: '1em' }}>
                {chunk(rowTracks, NUM_PER_COL).map((colTracks, j) => (
                  <Col xs={6} md={4}>
                    <ul style={{ listStyleType: 'none', padding: '0', marginTop: '1em' }}>
                      {colTracks.map((track, k) => (
                        <li>
                          <div style={{
                            display: 'inline-flex', position: 'relative', float: 'left', width: '100%',
                          }}
                          >
                            <img
                              height="50"
                              width="50"
                              src={track.album.images.length ? track.album.images[0].url : null}
                              alt={track.name}
                              style={{ objectFit: 'cover' }}
                            />
                            <OrdinalCircle position={i * NUM_PER_ROW + j * NUM_PER_COL + k + 1} />
                            <div style={{ marginLeft: '0.5em' }}>
                              <div>
                                <p
                                  style={{
                                    margin: '0',
                                    textAlign: 'left',
                                  }}
                                >
                                  <b>{track.artists[0].name}</b>
                                </p>
                              </div>
                              <div>
                                <p
                                  style={{
                                    margin: '0',
                                    textAlign: 'left',
                                  }}
                                >
                                  {track.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Container>
      </div>
    ) : null
  );
};

export default TrackGrid;
