import { combineReducers } from 'redux';
import {
  SET_USER,
  SET_TIME_RANGE_NAME,
  TimeRanges,
  REQUEST_ARTISTS,
  RECEIVE_ARTISTS,
  REQUEST_TRACKS,
  RECEIVE_TRACKS,
  REQUEST_FEATURES,
  RECEIVE_FEATURES,
  SET_ARTIST_COUNT,
  SET_TRACK_COUNT,
  SET_GENRE_COUNT,
  DEFAULT_ARTIST_COUNT,
  DEFAULT_TRACK_COUNT,
  DEFAULT_GENRE_COUNT,
  SET_HAS_CLICKED_CREATE,
  SET_STATS_OPTIONS,
  SET_DISPLAY_PROFILE,
  SET_OPTIMIZE_TRACKS,
} from '../constants/constants';

const { LONG } = TimeRanges;

function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}

function hasClickedCreate(state = false, action) {
  switch (action.type) {
    case SET_HAS_CLICKED_CREATE:
      return true;
    default:
      return state;
  }
}

function timeRangeName(state = LONG.name, action) {
  switch (action.type) {
    case SET_TIME_RANGE_NAME:
      return action.timeRangeName;
    default:
      return state;
  }
}

function artistCount(state = DEFAULT_ARTIST_COUNT, action) {
  switch (action.type) {
    case SET_ARTIST_COUNT:
      return action.artistCount;
    default:
      return state;
  }
}

function trackCount(state = DEFAULT_TRACK_COUNT, action) {
  switch (action.type) {
    case SET_TRACK_COUNT:
      return action.trackCount;
    default:
      return state;
  }
}

function genreCount(state = DEFAULT_GENRE_COUNT, action) {
  switch (action.type) {
    case SET_GENRE_COUNT:
      return action.genreCount;
    default:
      return state;
  }
}

function statsOptions(state = ['key', 'bpm', 'decades', 'scale', 'features'], action) {
  switch (action.type) {
    case SET_STATS_OPTIONS:
      return action.statsOptions;
    default:
      return state;
  }
}

function displayProfile(state = true, action) {
  switch (action.type) {
    case SET_DISPLAY_PROFILE:
      return action.displayProfile;
    default:
      return state;
  }
}

function optimizeTracks(state = true, action) {
  switch (action.type) {
    case SET_OPTIMIZE_TRACKS:
      return action.optimizeTracks;
    default:
      return state;
  }
}

function artists(state = {}, action) {
  switch (action.type) {
    case REQUEST_ARTISTS:
      return { ...state, isFetching: true };
    case RECEIVE_ARTISTS:
      return { ...state, isFetching: false, items: action.items };
    default:
      return state;
  }
}

function artistsByTimeRangeName(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ARTISTS:
    case REQUEST_ARTISTS:
      return { ...state, [action.timeRangeName]: artists(state[action.timeRangeName], action) };
    default:
      return state;
  }
}

function tracks(state = {}, action) {
  switch (action.type) {
    case REQUEST_TRACKS:
      return { ...state, isFetching: true };
    case RECEIVE_TRACKS:
      return { ...state, isFetching: false, items: action.items };
    default:
      return state;
  }
}

function tracksByTimeRangeName(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TRACKS:
    case REQUEST_TRACKS:
      return { ...state, [action.timeRangeName]: tracks(state[action.timeRangeName], action) };
    default:
      return state;
  }
}

function features(state = {}, action) {
  switch (action.type) {
    case REQUEST_FEATURES:
      return { ...state, isFetching: true };
    case RECEIVE_FEATURES:
      return { ...state, isFetching: false, items: action.items };
    default:
      return state;
  }
}

function featuresByTimeRangeName(state = {}, action) {
  switch (action.type) {
    case RECEIVE_FEATURES:
    case REQUEST_FEATURES:
      return { ...state, [action.timeRangeName]: features(state[action.timeRangeName], action) };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
  hasClickedCreate,
  timeRangeName,
  artistCount,
  trackCount,
  genreCount,
  statsOptions,
  displayProfile,
  optimizeTracks,
  artists,
  artistsByTimeRangeName,
  tracks,
  tracksByTimeRangeName,
  features,
  featuresByTimeRangeName,
});

export default rootReducer;
