import React from 'react';
import { shallow } from 'enzyme';

import SpotifyTopMusic from '../../components/SpotifyTopMusic';
import * as selectors from '../../reducers/selectors';
import {
  TimeRanges, DEFAULT_GENRE_COUNT, DEFAULT_ARTIST_COUNT, DEFAULT_TRACK_COUNT, DEFAULT_STATS_OPTIONS,
} from '../../constants/constants';

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}));

const setup = (
  user = {},
  timeRangeName = TimeRanges.LONG.name,
  genreCount = DEFAULT_GENRE_COUNT,
  artistCount = DEFAULT_ARTIST_COUNT,
  trackCount = DEFAULT_TRACK_COUNT,
  statsOptions = DEFAULT_STATS_OPTIONS,
  artistsByTimeRangeName = {},
  tracksByTimeRangeName = {},
  featuresByTimeRangeName = {},
  artistCountriesByTimeRangeName = {},
  artistReleasesByTimeRangeName = {},
) => {
  jest.spyOn(selectors, 'selectUser').mockReturnValue(user);
  jest.spyOn(selectors, 'selectTimeRangeName').mockReturnValue(timeRangeName);
  jest.spyOn(selectors, 'selectGenreCount').mockReturnValue(genreCount);
  jest.spyOn(selectors, 'selectArtistCount').mockReturnValue(artistCount);
  jest.spyOn(selectors, 'selectTrackCount').mockReturnValue(trackCount);
  jest.spyOn(selectors, 'selectStatsOptions').mockReturnValue(statsOptions);
  jest.spyOn(selectors, 'selectArtistsByCurrentTimeRange').mockReturnValue(artistsByTimeRangeName);
  jest.spyOn(selectors, 'selectTracksByCurrentTimeRange').mockReturnValue(tracksByTimeRangeName);
  jest.spyOn(selectors, 'selectFeaturesByCurrentTimeRange').mockReturnValue(featuresByTimeRangeName);
  jest.spyOn(selectors, 'selectArtistCountriesByCurrentTimeRange').mockReturnValue(artistCountriesByTimeRangeName);
  jest.spyOn(selectors, 'selectArtistReleasesByCurrentTimeRange').mockReturnValue(artistReleasesByTimeRangeName);
};

describe('SpotifyTopMusic', () => {
  beforeEach(() => {
    setup(
      { id: 'abc' },
      TimeRanges.LONG.name,
      10,
      10,
      10,
      ['bpm'],
      {
        LONG: [],
      },
      {
        LONG: [],
      },
      {
        LONG: [],
      },
      {
        LONG: [],
      },
      {
        LONG: [],
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should not log errors in console', () => {
    const wrapper = shallow(<SpotifyTopMusic />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<SpotifyTopMusic />);
    expect(wrapper).toMatchSnapshot();
  });
});
