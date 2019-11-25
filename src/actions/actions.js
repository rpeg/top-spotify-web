import {
  SET_USER, SET_TIME_RANGE, SET_ARTIST_COUNT, SET_TRACK_COUNT,
} from '../constants/constants';

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
