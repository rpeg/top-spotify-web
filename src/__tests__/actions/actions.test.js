import configureStore from 'redux-mock-store';

import * as actions from '../../actions/actions';
import * as constants from '../../constants/constants';

const mockStore = configureStore();
const store = mockStore();

describe('actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('setUser', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          user: 'test',
          type: constants.SET_USER,
        },
      ];

      store.dispatch(actions.setUser('test'));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('setHasClickedCreate', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          hasClickedCreate: true,
          type: constants.SET_HAS_CLICKED_CREATE,
        },
      ];

      store.dispatch(actions.setHasClickedCreate());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('setTimeRangeName', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          timeRangeName: constants.TimeRanges.MEDIUM.name,
          type: constants.SET_TIME_RANGE_NAME,
        },
      ];

      store.dispatch(actions.setTimeRangeName(constants.TimeRanges.MEDIUM.name));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('setArtistCount', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          artistCount: 10,
          type: constants.SET_ARTIST_COUNT,
        },
      ];

      store.dispatch(actions.setArtistCount(10));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('setTrackCount', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          trackCount: 10,
          type: constants.SET_TRACK_COUNT,
        },
      ];

      store.dispatch(actions.setTrackCount(10));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('setGenreCount', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          genreCount: 10,
          type: constants.SET_GENRE_COUNT,
        },
      ];

      store.dispatch(actions.setGenreCount(10));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('setStatsOptions', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          statsOptions: ['bpm'],
          type: constants.SET_STATS_OPTIONS,
        },
      ];

      store.dispatch(actions.setStatsOptions(['bpm']));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('setDisplayProfile', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          displayProfile: false,
          type: constants.SET_DISPLAY_PROFILE,
        },
      ];

      store.dispatch(actions.setDisplayProfile(false));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('setOptimizeTracks', () => {
    test('Dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          optimizeTracks: false,
          type: constants.SET_OPTIMIZE_TRACKS,
        },
      ];

      store.dispatch(actions.setOptimizeTracks(false));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
