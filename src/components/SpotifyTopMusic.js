import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { findKey } from 'lodash';
import { Spinner, Container } from 'react-bootstrap';

import ArtistGrid from './ArtistGrid';
import TrackGrid from './TrackGrid';
import WordCloud from './WordCloud';
import Statistics from './Statistics';
import ComponentHeader from './ComponentHeader';
import {
  receiveArtists,
  receiveTracks,
  receiveFeatures,
  fetchArtistsIfNeeded,
  fetchTracksIfNeeded,
  fetchFeaturesIfNeeded,
} from '../actions/actions';
import { TimeRanges } from '../constants/constants';
import { getTimeRangeByName } from '../lib/timeRange';

const matchingTimeRange = (range) => findKey(TimeRanges, (r) => r.range === range);

const SpotifyTopMusic = ({ socket }) => {
  const user = useSelector((state) => state.user);
  const timeRangeName = useSelector((state) => state.timeRangeName);
  const artistCount = useSelector((state) => state.artistCount);
  const trackCount = useSelector((state) => state.trackCount);
  const genreCount = useSelector((state) => state.genreCount);
  const statsOptions = useSelector((state) => state.statsOptions);
  const artists = useSelector((state) => state.artistsByTimeRangeName[timeRangeName]);
  const tracks = useSelector((state) => state.tracksByTimeRangeName[timeRangeName]);
  const features = useSelector((state) => state.featuresByTimeRangeName[timeRangeName]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchArtistsIfNeeded(timeRangeName, socket.id));
      dispatch(fetchTracksIfNeeded(timeRangeName, socket.id));
    }
  }, [dispatch, socket, timeRangeName, user]);

  useEffect(() => {
    socket.on('topArtists', (result) => {
      dispatch(receiveArtists(matchingTimeRange(result.range), result.items));
    });
  }, [dispatch, socket, timeRangeName]);

  useEffect(() => {
    socket.on('topTracks', (result) => {
      const timeRange = matchingTimeRange(result.range);
      dispatch(receiveTracks(timeRange, result.items));

      // Derive features from tracks
      dispatch(fetchFeaturesIfNeeded(timeRange, socket.id));
    });
  }, [dispatch, socket, timeRangeName]);

  useEffect(() => {
    socket.on('features', (result) => {
      dispatch(receiveFeatures(matchingTimeRange(result.range), result.items));
    });
  }, [dispatch, socket, timeRangeName]);

  const haveArtists = () => artists && artists.items && artists.items.length;
  const haveTracks = () => tracks && tracks.items && tracks.items.length;
  const haveFeatures = () => features && features.items && features.items.length;

  return (
    user && user.id ? (
      <div style={{ padding: '5em 0 5em 0' }}>
        <div>
          <h1>{getTimeRangeByName(timeRangeName).title}</h1>
        </div>
        <Container>
          {artistCount > 0 && (haveArtists()
            ? (
              <div>
                <ComponentHeader title="Artists" />
                <ArtistGrid artists={artists.items.slice(0, artistCount)} />
              </div>
            )
            : <Spinner animation="border" />)}
          {genreCount > 0 && (haveArtists()
            ? (
              <div>
                <ComponentHeader title="Genres" />
                <WordCloud
                  genres={[...artists.items.map((a) => a.genres).flat()]}
                  count={genreCount}
                />
              </div>
            )
            : <Spinner animation="border" />)}
          {trackCount > 0 && (haveTracks()
            ? (
              <div>
                <ComponentHeader title="Tracks" />
                <TrackGrid tracks={tracks.items} count={trackCount} />
              </div>
            )
            : <Spinner animation="border" />)}
          {statsOptions.length > 0 && (haveTracks() && haveFeatures()
            ? (
              <div>
                <ComponentHeader title="Statistics" />
                <Statistics features={features.items} tracks={tracks.items} />
              </div>
            )
            : <Spinner animation="border" />)}
        </Container>
      </div>
    ) : null
  );
};

SpotifyTopMusic.propTypes = {
  socket: PropTypes.object.isRequired,
};

export default SpotifyTopMusic;
