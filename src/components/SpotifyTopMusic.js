import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Container } from 'react-bootstrap';

import ArtistGrid from './ArtistGrid';
import TrackGrid from './TrackGrid';
import WordCloud from './WordCloud';
import Statistics from './Statistics';
import ComponentHeader from './ComponentHeader';
import {
  fetchArtistsIfNeeded,
  fetchTracksIfNeeded,
} from '../actions/actions';
import { getTimeRangeByName } from '../lib/timeRange';
import * as selectors from '../reducers/selectors';

const SpotifyTopMusic = () => {
  const user = useSelector(selectors.selectUser);
  const timeRangeName = useSelector(selectors.selectTimeRangeName);
  const artistCount = useSelector(selectors.selectArtistCount);
  const trackCount = useSelector(selectors.selectTrackCount);
  const genreCount = useSelector(selectors.selectGenreCount);
  const statsOptions = useSelector(selectors.selectStatsOptions);
  const artists = useSelector(selectors.selectArtistsByTimeRangeName[timeRangeName]);
  const tracks = useSelector(selectors.selectTracksByTimeRangeName[timeRangeName]);
  const features = useSelector(selectors.selectFeaturesByTimeRangeName[timeRangeName]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchArtistsIfNeeded(timeRangeName));
      dispatch(fetchTracksIfNeeded(timeRangeName));
    }
  }, [dispatch, timeRangeName, user]);

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

export default SpotifyTopMusic;
