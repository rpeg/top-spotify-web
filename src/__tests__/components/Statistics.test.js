import React from 'react';
import { shallow } from 'enzyme';

import Statistics from '../../components/Statistics';
import * as selectors from '../../reducers/selectors';
import { DEFAULT_STATS_OPTIONS } from '../../constants/constants';

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}));

const setup = (statsOptions = DEFAULT_STATS_OPTIONS) => {
  jest.spyOn(selectors, 'selectStatsOptions').mockReturnValue(statsOptions);
};

describe('Statistics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should not log errors in console', () => {
    setup();
    const wrapper = shallow(<Statistics />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    setup();
    const wrapper = shallow(<Statistics />);
    expect(wrapper).toMatchSnapshot();
  });
});
