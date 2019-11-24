import { combineReducers } from 'redux';
import {
  TOGGLE_IS_LOGGED_IN,
  SET_TIME_RANGE,
  TimeRanges,
} from '../constants/constants';

const { LONG } = TimeRanges;

function isLoggedIn(state = false, action) {
  switch (action.type) {
    case TOGGLE_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLoggedIn };
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

const app = combineReducers({
  isLoggedIn,
  timeRange,
});

export default app;
