import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { chunk } from 'lodash';
import ComponentHeader from './ComponentHeader';

import './TrackGrid.css';
import OrdinalCircle from './OrdinalCircle';

const NUM_PER_ROW = 15;
const NUM_PER_COL = 5;

// Return as many non-duplicate album tracks as possible within given params
const makeUniqueTracksArr = (tracks, count) => {
  const uniqueArr = [];
  const duplicateAlbumArr = [];

  tracks.forEach((t, i) => {
    if (uniqueArr.find((u) => u[1].album.id === t.album.id)) {
      duplicateAlbumArr.push([i, t]);
    } else {
      uniqueArr.push([i, t]);
    }
  });

  console.log(uniqueArr);

  if (uniqueArr.length >= count) { return uniqueArr.map((u) => u[1]).slice(0, count); }

  const combinedArr = [];

  for (let i = 0; i < count; i += 1) {
    const unique = uniqueArr.find((u) => u[0] === i);

    if (unique) {
      combinedArr.push(unique[1]);
    } else {
      combinedArr.push(duplicateAlbumArr.find((d) => d[0] === i)[1]);
    }
  }

  return combinedArr.slice(0, count);
};

const TrackGrid = ({ tracks, count }) => {
  const optimizeTracks = useSelector((state) => state.optimizeTracks);

  const tracksToMap = optimizeTracks ? makeUniqueTracksArr(tracks, count) : tracks.slice(0, count);

  const tracksByRow = chunk(tracksToMap, NUM_PER_ROW);

  return (
    count > 0 ? (
      <div>
        {tracksByRow.map((rowTracks, i) => (
          <div key={rowTracks.map((t) => t.id).toString()}>
            <Row>
              {i > 0 && (
              <hr style={{ marginBottom: '0', border: '1px solid rgba(255,255,255,.1)', width: '100%' }} />
              )}
            </Row>
            <Row className="track-grid" key={rowTracks.map((t) => t.id).join()} style={{ marginTop: '1em' }}>
              {chunk(rowTracks, NUM_PER_COL).map((colTracks, j) => (
                <Col xs={6} md={4} key={colTracks.map((t) => t.id).toString()}>
                  <ul style={{ listStyleType: 'none', padding: '0', marginTop: '1em' }}>
                    {colTracks.map((track, k) => (
                      <li key={track.id}>
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
                          <div style={{ marginLeft: '0.5em', lineHeight: '1.3' }}>
                            <div style={{ display: 'grid' }}>
                              <p
                                className="s"
                                style={{
                                  margin: '0',
                                  textAlign: 'left',
                                }}
                              >
                                <b>{track.artists[0].name}</b>
                              </p>
                            </div>
                            <div style={{ display: 'grid' }}>
                              <p
                                className="xs"
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
      </div>
    ) : null
  );
};

export default TrackGrid;
