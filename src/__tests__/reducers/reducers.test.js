import * as constants from '../../constants/constants';
import rootReducer from '../../reducers/reducers';

const initialState = {
  user: {},
  hasClickedCreate: false,
  timeRangeName: constants.TimeRanges.LONG.name,
  artistCount: constants.DEFAULT_ARTIST_COUNT,
  trackCount: constants.DEFAULT_TRACK_COUNT,
  genreCount: constants.DEFAULT_GENRE_COUNT,
  statsOptions: constants.DEFAULT_STATS_OPTIONS,
  displayProfile: true,
  optimizeTracks: true,
  artists: {},
  artistsByTimeRangeName: {},
  tracks: {},
  tracksByTimeRangeName: {},
  features: {},
  featuresByTimeRangeName: {},
};

describe('reducers', () => {
  describe('INITIAL_STATE', () => {
    test('is correct', () => {
      const action = { type: 'dummy_action' };

      expect(rootReducer(undefined, action)).toEqual(initialState);
    });
  });

  describe('SET_USER', () => {
    test('returns the correct state', () => {
      const user = { id: 'test' };
      const action = { type: constants.SET_USER, user };
      const expectedState = { ...initialState };
      expectedState.user = user;

      expect(rootReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('SET_HAS_CLICKED_CREATE', () => {
    test('returns the correct state', () => {
      const action = { type: constants.SET_HAS_CLICKED_CREATE };
      const expectedState = { ...initialState };
      expectedState.hasClickedCreate = true;

      expect(rootReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('SET_TIME_RANGE_NAME', () => {
    test('returns the correct state', () => {
      const action = {
        type: constants.SET_TIME_RANGE_NAME,
        timeRangeName: constants.TimeRanges.SHORT.name,
      };
      const expectedState = { ...initialState };
      expectedState.timeRangeName = constants.TimeRanges.SHORT.name;

      expect(rootReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('SET_ARTIST_COUNT', () => {
    test('returns the correct state', () => {
      const action = { type: constants.SET_ARTIST_COUNT, artistCount: 25 };
      const expectedState = { ...initialState };
      expectedState.artistCount = 25;

      expect(rootReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('SET_TRACK_COUNT', () => {
    test('returns the correct state', () => {
      const action = { type: constants.SET_TRACK_COUNT, trackCount: 25 };
      const expectedState = { ...initialState };
      expectedState.trackCount = 25;

      expect(rootReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('SET_GENRE_COUNT', () => {
    test('returns the correct state', () => {
      const action = { type: constants.SET_GENRE_COUNT, genreCount: 25 };
      const expectedState = { ...initialState };
      expectedState.genreCount = 25;

      expect(rootReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('SET_STATS_OPTIONS', () => {
    test('returns the correct state', () => {
      const action = { type: constants.SET_STATS_OPTIONS, statsOptions: ['bpm'] };
      const expectedState = { ...initialState };
      expectedState.statsOptions = ['bpm'];

      expect(rootReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('SET_DISPLAY_PROFILE', () => {
    test('returns the correct state', () => {
      const action = { type: constants.SET_DISPLAY_PROFILE, displayProfile: false };
      const expectedState = { ...initialState };
      expectedState.displayProfile = false;

      expect(rootReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('SET_OPTIMIZE_TRACKS', () => {
    test('returns the correct state', () => {
      const action = { type: constants.SET_OPTIMIZE_TRACKS, optimizeTracks: false };
      const expectedState = { ...initialState };
      expectedState.optimizeTracks = false;

      expect(rootReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('REQUEST_ARTISTS', () => {
    test('returns the correct state', () => {
      const action = {
        type: constants.REQUEST_ARTISTS,
        isFetching: true,
        timeRangeName: constants.TimeRanges.SHORT.name,
      };
      const expectedState = { ...initialState };
      expectedState.artists = { isFetching: true };
      expectedState.artistsByTimeRangeName = {
        SHORT: {
          isFetching: true,
        },
      };

      expect(rootReducer(undefined, action)).toEqual(expectedState);
    });
  });

  describe('RECEIVE_ARTISTS', () => {
    test('returns the correct state', () => {
      const items = [{ artistOne: 'a' }, { artistTwo: 'b' }];
      const action = {
        type: constants.RECEIVE_ARTISTS,
        items,
        timeRangeName: constants.TimeRanges.SHORT.name,
      };
      const expectedState = { ...initialState };
      expectedState.artists = { isFetching: false, items };
      expectedState.artistsByTimeRangeName = {
        SHORT: { isFetching: false, items },
      };

      expect(rootReducer(undefined, action)).toEqual(expectedState);
    });
  });
});
