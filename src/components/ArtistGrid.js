import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { chunk } from "lodash";

const ArtistGrid = ({ artists, title, numRows }) => {
  const rowLength = artists.length / numRows;
  const chunkedArtists = chunk(artists, rowLength);

  return (
    <div>
      <h2>{title}</h2>
      <Container>
        {chunkedArtists.map((artistRow, i) => (
          <Row key={i}>
            {artistRow.map((artist, i) => (
              <Col key={i}>
                <img
                  height="300"
                  width="300"
                  src={artist.images[0].url}
                  alt={artist.name}
                  style={{ objectFit: "cover" }}
                />
                <h4>{artist.name}</h4>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default ArtistGrid;
