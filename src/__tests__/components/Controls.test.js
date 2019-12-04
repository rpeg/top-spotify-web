import React from 'react';
import { shallow } from 'enzyme';

import Controls from '../../components/Controls';
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
  hasClickedCreate = false,
  displayProfile = true,
  optimizeTracks = true,
) => {
  jest.spyOn(selectors, 'selectUser').mockReturnValue(user);
  jest.spyOn(selectors, 'selectTimeRangeName').mockReturnValue(timeRangeName);
  jest.spyOn(selectors, 'selectGenreCount').mockReturnValue(genreCount);
  jest.spyOn(selectors, 'selectArtistCount').mockReturnValue(artistCount);
  jest.spyOn(selectors, 'selectTrackCount').mockReturnValue(trackCount);
  jest.spyOn(selectors, 'selectStatsOptions').mockReturnValue(statsOptions);
  jest.spyOn(selectors, 'selectHasClickedCreate').mockReturnValue(hasClickedCreate);
  jest.spyOn(selectors, 'selectDisplayProfile').mockReturnValue(displayProfile);
  jest.spyOn(selectors, 'selectOptimizeTracks').mockReturnValue(optimizeTracks);
};

describe('Controls', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should not log errors in console', () => {
    setup();
    const wrapper = shallow(<Controls />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    setup();
    const wrapper = shallow(<Controls />);
    expect(wrapper).toMatchSnapshot();
  });
});
