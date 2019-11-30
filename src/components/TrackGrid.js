import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { chunk } from 'lodash';

import './TrackGrid.css';
import OrdinalCircle from './OrdinalCircle';
import { TRACK_REQ_LIMIT } from '../constants/constants';

const NUM_PER_ROW = 15;
const NUM_PER_COL = 5;

// Return as many non-duplicate-album tracks as possible within given params
const makeOptimizedTracks = (tracks, count) => {
  if (count === TRACK_REQ_LIMIT) return tracks;

  const uniqueArr = [];
  const duplicateAlbumArr = [];

  tracks.forEach((t, i) => {
    if (uniqueArr.find((u) => u[1].album.id === t.album.id)) {
      duplicateAlbumArr.push([i, t]);
    } else {
      uniqueArr.push([i, t]);
    }
  });

  if (uniqueArr.length >= count) { return uniqueArr.map((u) => u[1]).slice(0, count); }

  const combinedArr = [...uniqueArr];

  // Fill in remaining slots with duplicate-album tracks, favoring higher positions
  for (let i = 0; i < (count - uniqueArr.length); i += 1) {
    combinedArr.splice(duplicateAlbumArr[i][0], 0, duplicateAlbumArr[i]);
  }

  return combinedArr.map((t) => t[1]).slice(0, count);
};

const TrackGrid = ({ tracks, count }) => {
  const optimizeTracks = useSelector((state) => state.optimizeTracks);

  const tracksToMap = optimizeTracks ? makeOptimizedTracks(tracks, count) : tracks.slice(0, count);

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
                            src={track.album.images.length ? track.album.images[0].url : 'images/music_note.svg'}
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
