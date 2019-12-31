import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { chunk, isEmpty, range } from 'lodash';

const NUM_PER_ROW = 5;

const ArtistGrid = ({ artists }) => {
  const chunkedArtists = chunk(artists, NUM_PER_ROW);

  const getColPadding = (index) => {
    switch (index) {
      case 0: return '0 2px 0 0';
      case (NUM_PER_ROW - 1): return '0 0 0 2px';
      default: return '0 2px 0 2px';
    }
  };

  return chunkedArtists.map((artistRow, i) => (
    <div key={artistRow.map((a) => a.id).toString()}>
      <Row key={chunkedArtists[i].map((a) => a.id).toString()} style={{ paddingTop: `${i > 0 ? '4px' : '0px'}` }}>
        {artistRow.map((artist, index) => (
          <Col
            key={artist.id}
            style={{
              padding: `${getColPadding(index)}`,
            }}
          >
            <div style={{
              display: 'flex', paddingBottom: '100%', overflow: 'hidden', position: 'relative',
            }}
            >
              <img
                src={!isEmpty(artist.images) && artist.images[0].url ? artist.images[0].url : 'images/person.svg'}
                alt={artist.name}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  objectFit: 'cover',
                  objectPosition: 'center',
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
                  className="s text-s"
                  style={{
                    marginBottom: '0',
                    color: 'white',
                  }}
                >
                  <b>{artist.name}</b>
                </p>
              </div>
            </div>
          </Col>
        ))}
        {artistRow.length < NUM_PER_ROW && range(NUM_PER_ROW - artistRow.length).map((index) => (
          <Col
            key={index}
            style={{
              padding: `${getColPadding(artistRow.length + index)}`,
            }}
          />
        ))}
      </Row>
    </div>
  ));
};

export default ArtistGrid;
