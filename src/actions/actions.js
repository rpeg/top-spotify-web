import axios from 'axios';
import { chunk } from 'lodash';

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
  FEATURE_REQ_LIMIT,
} from '../constants/constants';
import { API_URL } from '../config';

export function setUser(user) {
  return { type: SET_USER, user };
}

export function setTimeRange(range) {
  return { type: SET_TIME_RANGE, range };
}

export function setArtistCount(count) {
  return { type: SET_ARTIST_COUNT, count };
}

export function setTrackCount(count) {
  return { type: SET_TRACK_COUNT, count };
}

function requestArtists(timeRange) {
  return {
    type: REQUEST_ARTISTS,
    timeRange,
  };
}

function receiveArtists(timeRange, items) {
  return {
    type: RECEIVE_ARTISTS,
    timeRange,
    items,
  };
}

const fetchArtistsFromOffset = (timeRange, offset) => async () => axios
  .get(`${API_URL}/api/my-top-artists`, {
    params: {
      time_range: `${timeRange}_term`,
      offset,
      limit: ARTIST_REQ_LIMIT,
    },
  });

function fetchArtists(timeRange) {
  return (dispatch) => {
    dispatch(requestArtists(timeRange));

    const promises = [];

    for (let i = 0; i <= N_ARTISTS; i += ARTIST_REQ_LIMIT) {
      promises.push(fetchArtistsFromOffset(timeRange, i));
    }

    return async () => {
      await Promise.all(promises)
        .then((results) => {
          const result = results.flat();
          dispatch(receiveArtists(timeRange, result.data.items));
        })
        .catch((err) => console.log(err));
    };
  };
}

const shouldFetchArtists = (state, timeRange) => !state.artistsByTimeRange[timeRange];

export function fetchArtistsIfNeeded(timeRange) {
  return (dispatch, getState) => {
    if (shouldFetchArtists(getState(), timeRange)) {
      return dispatch(fetchArtists(timeRange));
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

function receiveTracks(timeRange, items) {
  return {
    type: RECEIVE_TRACKS,
    timeRange,
    items,
  };
}

const fetchTracksFromOffset = (timeRange, offset) => async () => axios
  .get(`${API_URL}/api/my-top-tracks`, {
    params: {
      time_range: `${timeRange}_term`,
      offset,
      limit: TRACK_REQ_LIMIT,
    },
  });

function fetchTracks(timeRange) {
  return (dispatch) => {
    dispatch(requestTracks(timeRange));

    const promises = [];

    for (let i = 0; i <= N_TRACKS; i += TRACK_REQ_LIMIT) {
      promises.push(fetchTracksFromOffset(timeRange, i));
    }

    return async () => {
      await Promise.all(promises)
        .then((results) => {
          const result = results.flat();
          dispatch(receiveTracks(timeRange, result.data.items));
        })
        .catch((err) => console.log(err));
    };
  };
}

const shouldFetchTracks = (state, timeRange) => !state.tracksByTimeRange[timeRange];

export function fetchTracksIfNeeded(timeRange) {
  return (dispatch, getState) => {
    if (shouldFetchTracks(getState(), timeRange)) {
      return dispatch(fetchTracks(timeRange));
    }
    return Promise.resolve();
  };
}

function requestFeatures() {
  return {
    type: REQUEST_FEATURES,
  };
}

function receiveFeatures(timeRange, items) {
  return {
    type: RECEIVE_FEATURES,
    timeRange,
    items,
  };
}

const fetchFeaturesForChunk = (tracks) => async () => axios
  .get(`${API_URL}/api/track-features`, {
    params: {
      ids: tracks.map((t) => t.id).join(','),
    },
  });

function fetchFeatures(tracks) {
  return (dispatch) => {
    dispatch(requestFeatures());

    const chunkedTracks = chunk(tracks, FEATURE_REQ_LIMIT);
    const promises = [];

    for (let i = 0; i < chunkedTracks.length; i += 1) {
      promises.push(fetchFeaturesForChunk(chunkedTracks[i]));
    }

    return async () => {
      await Promise.all(promises)
        .then((results) => {
          const result = results.flat();
          dispatch(receiveFeatures(result.data.items));
        })
        .catch((err) => console.log(err));
    };
  };
}

const shouldFetchFeatures = (state, timeRange) => !state.features[timeRange];

export function fetchFeaturesIfNeeded(timeRange) {
  return (dispatch, getState) => {
    if (shouldFetchFeatures(getState(), timeRange)) {
      return dispatch(fetchFeatures(getState().tracks));
    }
    return Promise.resolve();
  };
}
