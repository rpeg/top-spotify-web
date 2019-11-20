import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Container, Row, Col } from "react-bootstrap";

import SectionHeader from "./SectionHeader";
import ArtistGrid from "./ArtistGrid";
import TrackGrid from "./TrackGrid";
import WordCloud from "./WordCloud";

const SectionTemplate = ({ title, timeRange }) => {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [fetchComplete] = useState(artists.length > 0 && tracks.length > 0);

  useEffect(() => {
    const fetchArtists = async () => {
      const result = await axios
        .get("http://localhost:3000/my-top-artists", {
          params: {
            time_range: timeRange + "_term",
            limit: 50
          }
        })
        .catch(err => console.log(err));

      setArtists(result.data.items);
    };

    const fetchTracks = async () => {
      const result = await axios
        .get("http://localhost:3000/my-top-tracks", {
          params: {
            time_range: timeRange + "_term",
            limit: 50
          }
        })
        .catch(err => console.log(err));

      setTracks(result.data.items);
    };

    fetchArtists();
    fetchTracks();
  }, [timeRange]);

  return (
    <Container>
      <Row>
        <SectionHeader title={title} />
      </Row>
      <Row hidden={fetchComplete}>
        <Col>
          <Spinner animation="border" />
        </Col>
      </Row>
      {artists.length > 0 && (
        <ArtistGrid artists={artists.slice(0, 8)} numRows={2} />
      )}
      {tracks.length > 0 && (
        <Row>
          <Col>
            <WordCloud
              genres={[...artists.map(a => a.genres).flat()]}
              count={100}
            />
          </Col>
          <Col>
            <TrackGrid />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SectionTemplate;