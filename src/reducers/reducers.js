import { combineReducers } from 'redux';
import {
  SET_USER,
  SET_TIME_RANGE,
  TimeRanges,
  REQUEST_ARTISTS,
  RECEIVE_ARTISTS,
  REQUEST_TRACKS,
  RECEIVE_TRACKS,
  REQUEST_FEATURES,
  RECEIVE_FEATURES,
} from '../constants/constants';

const { LONG } = TimeRanges;

function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}

function timeRange(state = LONG, action) {
  switch (action.type) {
    case SET_TIME_RANGE:
      return { ...state, timeRange: action.range };
    default:
      return state;
  }
}

function artists(state = {}, action) {
  switch (action.type) {
    case REQUEST_ARTISTS:
      return { ...state, isFetching: true };
    case RECEIVE_ARTISTS:
      return { ...state, isFetching: false, items: action.artists };
    default:
      return state;
  }
}

function artistsByTimeRange(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ARTISTS:
    case REQUEST_ARTISTS:
      return { ...state, [action.timeRange]: artists(state[action.timeRange], action) };
    default:
      return state;
  }
}

function tracks(state = {}, action) {
  switch (action.type) {
    case REQUEST_TRACKS:
      return { ...state, isFetching: true };
    case RECEIVE_TRACKS:
      return { ...state, isFetching: false, items: action.tracks };
    default:
      return state;
  }
}

function tracksByTimeRange(state = {}, action) {
  switch (action.type) {
    case RECEIVE_TRACKS:
    case REQUEST_TRACKS:
      return { ...state, [action.timeRange]: tracks(state[action.timeRange], action) };
    default:
      return state;
  }
}

function features(state = {}, action) {
  switch (action.type) {
    case REQUEST_FEATURES:
      return { ...state, isFetching: true };
    case RECEIVE_FEATURES:
      return { ...state, isFetching: false, items: action.features };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user,
  timeRange,
  artists,
  artistsByTimeRange,
  tracks,
  tracksByTimeRange,
  features,
});

export default rootReducer;
