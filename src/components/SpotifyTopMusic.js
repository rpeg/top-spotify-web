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

const SpinnerBlock = () => (
  <div style={{ marginTop: '2em' }}>
    <Spinner animation="border" />
  </div>
);

const SpotifyTopMusic = () => {
  const user = useSelector(selectors.selectUser);
  const timeRangeName = useSelector(selectors.selectTimeRangeName);
  const artistCount = useSelector(selectors.selectArtistCount);
  const trackCount = useSelector(selectors.selectTrackCount);
  const genreCount = useSelector(selectors.selectGenreCount);
  const statsOptions = useSelector(selectors.selectStatsOptions);
  const artists = useSelector(selectors.selectArtistsByCurrentTimeRange);
  const tracks = useSelector(selectors.selectTracksByCurrentTimeRange);
  const features = useSelector(selectors.selectFeaturesByCurrentTimeRange);

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
      <div style={{ padding: '2em 0 0 0' }}>
        <div>
          <p className="text-xl" style={{ marginBottom: '0uu' }}>{getTimeRangeByName(timeRangeName).title}</p>
        </div>
        <Container>
          {artistCount > 0 && (haveArtists()
            ? (
              <div>
                <ComponentHeader title="Artists" />
                <div style={{ marginTop: '1em' }}>
                  <ArtistGrid artists={artists.items.slice(0, artistCount)} />
                </div>
              </div>
            )
            : <SpinnerBlock />)}
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
            : <SpinnerBlock />)}
          {trackCount > 0 && (haveTracks()
            ? (
              <div>
                <ComponentHeader title="Tracks" />
                <TrackGrid tracks={tracks.items} count={trackCount} />
              </div>
            )
            : <SpinnerBlock />)}
          {statsOptions.length > 0 && (haveTracks() && haveFeatures()
            ? (
              <div>
                <ComponentHeader title="Statistics" />
                <Statistics features={features.items} tracks={tracks.items} />
              </div>
            )
            : <SpinnerBlock />)}
        </Container>
      </div>
    ) : null
  );
};

export default SpotifyTopMusic;
