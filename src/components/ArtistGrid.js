import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { chunk, isEmpty } from 'lodash';

const ArtistGrid = ({ artists }) => {
  const chunkedArtists = chunk(artists, 5);

  const getColPadding = (index, length) => {
    switch (index) {
      case 0: return '0 2px 0 0';
      case length: return '0 0 0 2px';
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
              padding: `${getColPadding(index, artistRow.length)}`,
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
      </Row>
    </div>
  ));
};

export default ArtistGrid;
