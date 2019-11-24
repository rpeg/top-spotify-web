import {
  TOGGLE_IS_LOGGED_IN, SET_TIME_RANGE, SET_ARTIST_COUNT, SET_TRACK_COUNT,
} from '../constants/constants';

export function toggleIsLoggedIn(isLoggedIn) {
  return { type: TOGGLE_IS_LOGGED_IN, isLoggedIn };
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
