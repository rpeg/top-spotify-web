import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { chunk } from 'lodash';

const ArtistGrid = ({ artists }) => {
  const chunkedArtists = chunk(artists, 5);

  return chunkedArtists.map((artistRow, i) => (
    <Row key={chunkedArtists[i].toString()} style={{ paddingTop: `${i > 0 ? '4px' : '0px'}` }}>
      {artistRow.map((artist, j) => (
        <Col key={artistRow[j].toString()} style={{ padding: '0px 2px 0px 2px' }}>
          <img
            src={artist.images[0].url}
            alt={artist.name}
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              height: '100%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              zIndex: '10',
              width: '100%',
              bottom: '0',
              marginBottom: '0',
              background: 'rgba(0,0,0,0.5)',
            }}
          >
            <p
              style={{
                marginBottom: '0',
                color: 'white',
              }}
            >
              <b>{artist.name}</b>
            </p>
          </div>
        </Col>
      ))}
    </Row>
  ));
};

export default ArtistGrid;
