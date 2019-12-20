import axios from 'axios';

import {
  SET_USER,
  SET_HAS_CLICKED_CREATE,
  SET_TIME_RANGE_NAME,
  SET_ARTIST_COUNT,
  SET_TRACK_COUNT,
  RECEIVE_TRACKS,
  RECEIVE_ARTISTS,
  RECEIVE_FEATURES,
  REQUEST_ARTISTS,
  REQUEST_TRACKS,
  REQUEST_FEATURES,
  TRACK_REQ_LIMIT,
  N_TRACKS,
  N_ARTISTS,
  ARTIST_REQ_LIMIT,
  SET_GENRE_COUNT,
  TimeRanges,
  SET_DISPLAY_PROFILE,
  SET_DISPLAY_MAP,
  SET_STATS_OPTIONS,
  SET_OPTIMIZE_TRACKS,
  REQUEST_ARTIST_COUNTRIES,
  RECEIVE_ARTIST_COUNTRIES,
  REQUEST_ARTIST_RELEASES,
  RECEIVE_ARTIST_RELEASES,
} from '../constants/constants';
import {
  MUSICBRAINZ_API_URL,
  SPOTIFY_API_URL,
} from '../config';

const getTimeRangeByName = (name) => Object.values(TimeRanges).find((r) => r.name === name);

export function setUser(user) {
  return { type: SET_USER, user };
}

export function setHasClickedCreate() {
  return { type: SET_HAS_CLICKED_CREATE, hasClickedCreate: true };
}

export function setTimeRangeName(timeRangeName) {
  return { type: SET_TIME_RANGE_NAME, timeRangeName };
}

export function setArtistCount(artistCount) {
  return { type: SET_ARTIST_COUNT, artistCount };
}

export function setTrackCount(trackCount) {
  return { type: SET_TRACK_COUNT, trackCount };
}

export function setGenreCount(genreCount) {
  return { type: SET_GENRE_COUNT, genreCount };
}

export function setStatsOptions(statsOptions) {
  return { type: SET_STATS_OPTIONS, statsOptions };
}

export function setDisplayProfile(displayProfile) {
  return { type: SET_DISPLAY_PROFILE, displayProfile };
}

export function setDisplayMap(displayMap) {
  return { type: SET_DISPLAY_MAP, displayMap };
}

export function setOptimizeTracks(optimizeTracks) {
  return { type: SET_OPTIMIZE_TRACKS, optimizeTracks };
}

function requestArtistCountries(timeRangeName) {
  return {
    type: REQUEST_ARTIST_COUNTRIES,
    timeRangeName,
  };
}

export function receiveArtistCountries(timeRangeName, items) {
  return {
    type: RECEIVE_ARTIST_COUNTRIES,
    timeRangeName,
    items,
  };
}

function fetchArtistCountries(artistReleases, timeRangeName) {
  return (dispatch) => {
    dispatch(requestArtistCountries());

    return axios
      .get(`${MUSICBRAINZ_API_URL}/api/artist-locations`, {
        params: {
          artistReleases: JSON.stringify(artistReleases),
        },
      })
      .then((response) => dispatch(receiveArtistCountries(timeRangeName, response.data)));
  };
}

const shouldFetchArtistCountries = (state, timeRangeName) => !state
  .artistCountriesByTimeRangeName[timeRangeName];

export function fetchArtistCountriesIfNeeded(timeRangeName, artistReleases) {
  return (dispatch, getState) => {
    if (shouldFetchArtistCountries(getState(), timeRangeName)) {
      if (artistReleases.length) {
        return dispatch(fetchArtistCountries(artistReleases, timeRangeName));
      }
    }
    return Promise.resolve();
  };
}

function requestArtistReleases(timeRangeName) {
  return {
    type: REQUEST_ARTIST_RELEASES,
    timeRangeName,
  };
}

export function receiveArtistReleases(timeRangeName, items) {
  return {
    type: RECEIVE_ARTIST_RELEASES,
    timeRangeName,
    items,
  };
}

function fetchArtistReleases(ids, timeRangeName) {
  return (dispatch) => {
    dispatch(requestArtistReleases());

    return axios
      .get(`${SPOTIFY_API_URL}/api/albums-by-artists`, {
        params: {
          ids: ids.join(','),
        },
      })
      .then((response) => {
        dispatch(receiveArtistReleases(timeRangeName, response.data.items));

        const artistReleases = response.data.items.map((item) => (
          {
            name: item.artists[0].name,
            release: item.name,
          }
        ));

        dispatch(fetchArtistCountriesIfNeeded(timeRangeName, artistReleases));
      });
  };
}

const shouldFetchArtistReleases = (state, timeRangeName) => !state
  .artistReleasesByTimeRangeName[timeRangeName];

export function fetchArtistReleasesIfNeeded(timeRangeName, artists) {
  return (dispatch, getState) => {
    if (shouldFetchArtistReleases(getState(), timeRangeName)) {
      const ids = artists.map((a) => a.id);
      if (ids.length) { return dispatch(fetchArtistReleases(ids, timeRangeName)); }
    }
    return Promise.resolve();
  };
}

function requestArtists(timeRangeName) {
  return {
    type: REQUEST_ARTISTS,
    timeRangeName,
  };
}

export function receiveArtists(timeRangeName, items) {
  return {
    type: RECEIVE_ARTISTS,
    timeRangeName,
    items,
  };
}

function fetchArtists(timeRangeName) {
  return (dispatch) => {
    dispatch(requestArtists(timeRangeName));

    const timeRange = getTimeRangeByName(timeRangeName);

    return axios
      .get(`${SPOTIFY_API_URL}/api/my-top-artists`, {
        params: {
          time_range: `${timeRange.range}`,
          offset: 0,
          n: N_ARTISTS,
          limit: ARTIST_REQ_LIMIT,
        },
      })
      .then((response) => {
        dispatch(receiveArtists(timeRangeName, response.data.items));
        dispatch(fetchArtistReleasesIfNeeded(timeRangeName, response.data.items));
      });
  };
}

const shouldFetchArtists = (state, timeRangeName) => !state.artistsByTimeRangeName[timeRangeName];

export function fetchArtistsIfNeeded(timeRangeName) {
  return (dispatch, getState) => {
    if (shouldFetchArtists(getState(), timeRangeName)) {
      return dispatch(fetchArtists(timeRangeName));
    }
    return Promise.resolve();
  };
}

function requestFeatures(timeRangeName) {
  return {
    type: REQUEST_FEATURES,
    timeRangeName,
  };
}

export function receiveFeatures(timeRangeName, items) {
  return {
    type: RECEIVE_FEATURES,
    timeRangeName,
    items,
  };
}

function fetchFeatures(ids, timeRangeName) {
  return (dispatch) => {
    dispatch(requestFeatures());

    const timeRange = getTimeRangeByName(timeRangeName);

    return axios
      .get(`${SPOTIFY_API_URL}/api/track-features`, {
        params: {
          time_range: `${timeRange.range}`,
          ids: `${ids.join(',')}`,
        },
      })
      .then((response) => dispatch(receiveFeatures(timeRangeName, response.data.items)));
  };
}

const shouldFetchFeatures = (state, timeRangeName) => !state.featuresByTimeRangeName[timeRangeName];

export function fetchFeaturesIfNeeded(timeRangeName, tracks) {
  return (dispatch, getState) => {
    if (shouldFetchFeatures(getState(), timeRangeName)) {
      const ids = tracks ? tracks.map((t) => t.id) : null;

      if (ids) { return dispatch(fetchFeatures(ids, timeRangeName)); }
    }
    return Promise.resolve();
  };
}

function requestTracks(timeRangeName) {
  return {
    type: REQUEST_TRACKS,
    timeRangeName,
  };
}

export function receiveTracks(timeRangeName, items) {
  return {
    type: RECEIVE_TRACKS,
    timeRangeName,
    items,
  };
}

function fetchTracks(timeRangeName) {
  return (dispatch) => {
    dispatch(requestTracks(timeRangeName));

    const timeRange = getTimeRangeByName(timeRangeName);

    return axios
      .get(`${SPOTIFY_API_URL}/api/my-top-tracks`, {
        params: {
          time_range: `${timeRange.range}`,
          offset: 0,
          n: N_TRACKS,
          limit: TRACK_REQ_LIMIT,
        },
      })
      .then((response) => {
        dispatch(receiveTracks(timeRangeName, response.data.items));
        dispatch(fetchFeaturesIfNeeded(timeRangeName, response.data.items));
      });
  };
}

const shouldFetchTracks = (state, timeRangeName) => !state.tracksByTimeRangeName[timeRangeName];

export function fetchTracksIfNeeded(timeRangeName) {
  return (dispatch, getState) => {
    if (shouldFetchTracks(getState(), timeRangeName)) {
      return dispatch(fetchTracks(timeRangeName));
    }
    return Promise.resolve();
  };
}
