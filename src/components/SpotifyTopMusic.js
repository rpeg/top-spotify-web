import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Spinner, Container, Row, Col,
} from 'react-bootstrap';

import ArtistGrid from './ArtistGrid';
import TrackGrid from './TrackGrid';
import WordCloud from './WordCloud';
import Features from './Features';
import ComponentHeader from './ComponentHeader';

const SpotifyTopMusic = ({ title, timeRange }) => {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [features, setFeatures] = useState([]);

  const isFetchComplete = () => artists.length > 0 && tracks.length > 0 && features.length > 0;

  useEffect(() => {
    const fetchArtists = async () => {
      const result = await axios
        .get('http://localhost:3000/my-top-artists', {
          params: {
            time_range: `${timeRange}_term`,
            limit: 50,
          },
        })
        .catch((err) => console.log(err));

      setArtists(result.data.items);
    };

    const fetchTracks = async () => {
      const result = await axios
        .get('http://localhost:3000/my-top-tracks', {
          params: {
            time_range: `${timeRange}_term`,
            limit: 50,
          },
        })
        .catch((err) => console.log(err));

      setTracks(result.data.items);
      fetchFeatures(result.data.items);
    };

    const fetchFeatures = async (tracks) => {
      const result = await axios
        .get('http://localhost:3000/track-features', {
          params: {
            ids: tracks.map((t) => t.id).join(','),
          },
        })
        .catch((err) => console.log(err));

      setFeatures(result.data.audio_features);
    };

    fetchArtists();
    fetchTracks();
  }, [timeRange]);

  return (
    <div style={{ marginTop: '2em' }}>
      <div>
        <h1>{title}</h1>
      </div>
      {!isFetchComplete && <Spinner animation="border" />}
      {isFetchComplete && (
        <Container>
          <Row>
            <ComponentHeader title="Artists" />
          </Row>
          {artists.length > 0 && (
            <ArtistGrid artists={artists.slice(0, 10)} numRows={2} />
          )}
          {tracks.length > 0 && features.length > 0 && (
            <Row style={{ paddingTop: '2em' }}>
              <Col xs={8} style={{ padding: '0 0.5em 0 0' }}>
                <WordCloud
                  genres={[...artists.map((a) => a.genres).flat()]}
                  count={40}
                />
                <Features features={features} />
              </Col>
              <Col xs={4} style={{ padding: '0 0 0 0.5em' }}>
                <TrackGrid tracks={tracks} count={15} />
              </Col>
            </Row>
          )}
        </Container>
      )}
    </div>
  );
};

export default SpotifyTopMusic;
