export const SET_USER = 'SET_USER';
export const SET_HAS_CLICKED_CREATE = 'SET_HAS_CLICKED_CREATE';
export const SET_TIME_RANGE_NAME = 'SET_TIME_RANGE_NAME';
export const SET_ARTIST_COUNT = 'SET_ARTIST_COUNT';
export const SET_TRACK_COUNT = 'SET_TRACK_COUNT';
export const SET_GENRE_COUNT = 'SET_GENRE_COUNT';
export const REQUEST_ARTISTS = 'REQUEST_ARTISTS';
export const REQUEST_TRACKS = 'REQUEST_TRACKS';
export const REQUEST_FEATURES = 'REQUEST_FEATURES';
export const RECEIVE_ARTISTS = 'RECEIVE_ARTISTS';
export const RECEIVE_TRACKS = 'RECEIVE_TRACKS';
export const RECEIVE_FEATURES = 'RECEIVE_FEATURES';

// TODO increase N once Spotify allows for more top artists/tracks
export const ARTIST_REQ_LIMIT = 50;
export const TRACK_REQ_LIMIT = 50;
export const N_ARTISTS = ARTIST_REQ_LIMIT;
export const N_TRACKS = TRACK_REQ_LIMIT;

export const DEFAULT_ARTIST_COUNT = 10;
export const DEFAULT_TRACK_COUNT = 10;
export const DEFAULT_GENRE_COUNT = 40;

export const TimeRanges = {
  LONG: { name: 'LONG', range: 'long_term', title: 'All-time' },
  MEDIUM: { name: 'MEDIUM', range: 'medium_term', title: 'Last Six Months' },
  SHORT: { name: 'SHORT', range: 'short_term', title: 'Recent' },
};
