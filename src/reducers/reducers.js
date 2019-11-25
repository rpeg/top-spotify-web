import { combineReducers } from 'redux';
import {
  SET_USER,
  SET_TIME_RANGE,
  TimeRanges,
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

const app = combineReducers({
  user,
  timeRange,
});

export default app;
