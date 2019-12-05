import React from 'react';
import { shallow } from 'enzyme';

import App from '../../containers/App';
import MainHeader from '../../components/MainHeader';
import SpotifyTopMusic from '../../components/SpotifyTopMusic';
import * as selectors from '../../reducers/selectors';
import OAuth from '../../components/OAuth';
import Controls from '../../components/Controls';

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}));

const setup = ({ hasClickedCreate = false }) => {
  jest.spyOn(selectors, 'selectHasClickedCreate').mockReturnValue(hasClickedCreate);
};

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should not log errors in console', () => {
    setup({ hasClickedCreate: false });
    const wrapper = shallow(<App />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders children correctly', () => {
    setup({ hasClickedCreate: false });
    const wrapper = shallow(<App />);
    expect(wrapper.find(OAuth).exists()).toBe(true);
    expect(wrapper.find(Controls).exists()).toBe(true);
  });

  describe('conditional renders', () => {
    it('renders MainHeader and SpotifyTopMusic if hasClickedCreate', () => {
      setup({ hasClickedCreate: true });
      const wrapper = shallow((<App />));
      expect(wrapper.find(MainHeader).exists()).toBe(true);
      expect(wrapper.find(SpotifyTopMusic).exists()).toBe(true);
    });
  });
});
