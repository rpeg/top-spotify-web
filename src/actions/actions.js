import axios from 'axios';

import {
  SET_USER,
  SET_TIME_RANGE,
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
} from '../constants/constants';
import { API_URL } from '../config';

export function setUser(user) {
  return { type: SET_USER, user };
}

export function setTimeRange(timeRange) {
  return { type: SET_TIME_RANGE, timeRange };
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

function requestArtists(timeRange) {
  return {
    type: REQUEST_ARTISTS,
    timeRange,
  };
}

export function receiveArtists(timeRange, items) {
  return {
    type: RECEIVE_ARTISTS,
    timeRange,
    items,
  };
}

function fetchArtists(timeRange, socketId) {
  return (dispatch) => {
    dispatch(requestArtists(timeRange));

    return axios.get(`${API_URL}/api/my-top-artists?socketId=${socketId}`, {
      params: {
        time_range: `${timeRange.range}`,
        offset: 0,
        n: N_ARTISTS,
        limit: ARTIST_REQ_LIMIT,
      },
    });
  };
}

const shouldFetchArtists = (state, timeRange) => !state.artistsByTimeRange[timeRange];

export function fetchArtistsIfNeeded(timeRange, socketId) {
  return (dispatch, getState) => {
    if (shouldFetchArtists(getState(), timeRange)) {
      return dispatch(fetchArtists(timeRange, socketId));
    }
    return Promise.resolve();
  };
}

function requestTracks(timeRange) {
  return {
    type: REQUEST_TRACKS,
    timeRange,
  };
}

export function receiveTracks(timeRange, items) {
  return {
    type: RECEIVE_TRACKS,
    timeRange,
    items,
  };
}

function fetchTracks(timeRange, socketId) {
  return (dispatch) => {
    dispatch(requestTracks(timeRange));

    return axios.get(`${API_URL}/api/my-top-tracks?socketId=${socketId}`, {
      params: {
        time_range: `${timeRange.range}`,
        offset: 0,
        n: N_TRACKS,
        limit: TRACK_REQ_LIMIT,
      },
    });
  };
}

const shouldFetchTracks = (state, timeRange) => !state.tracksByTimeRange[timeRange];

export function fetchTracksIfNeeded(timeRange, socketId) {
  return (dispatch, getState) => {
    if (shouldFetchTracks(getState(), timeRange)) {
      return dispatch(fetchTracks(timeRange, socketId));
    }
    return Promise.resolve();
  };
}

function requestFeatures() {
  return {
    type: REQUEST_FEATURES,
  };
}

export function receiveFeatures(timeRange, items) {
  return {
    type: RECEIVE_FEATURES,
    timeRange,
    items,
  };
}

function fetchFeatures(ids, timeRange, socketId) {
  return (dispatch) => {
    dispatch(requestFeatures());

    return axios
      .get(`${API_URL}/api/track-features?socketId=${socketId}`, {
        params: {
          time_range: `${timeRange.range}`,
          ids,
        },
      });
  };
}

const shouldFetchFeatures = (state, timeRange) => !state.featuresByTimeRange[timeRange];

export function fetchFeaturesIfNeeded(timeRange, socketId) {
  return (dispatch, getState) => {
    if (shouldFetchFeatures(getState(), timeRange)) {
      const tracks = getState().tracksByTimeRange[timeRange];
      const ids = tracks ? tracks.items.map((t) => t.id) : null;

      if (ids) { return dispatch(fetchFeatures(ids, timeRange, socketId)); }
    }
    return Promise.resolve();
  };
}
