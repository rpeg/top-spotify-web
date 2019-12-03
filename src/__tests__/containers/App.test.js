import React from 'react';
import { shallow } from 'enzyme';

import App from '../../containers/App';
import MainHeader from '../../components/MainHeader';
import SpotifyTopMusic from '../../components/SpotifyTopMusic';
import * as selectors from '../../reducers/selectors'

jest.mock("react-redux", () => ({
  useSelector: jest.fn(fn => fn()),
  useDispatch: () => jest.fn()
}));

const setup = ({ hasClickedCreate = false }) => {
  jest.spyOn(selectors, "hasClickedCreate").mockReturnValue(hasClickedCreate);
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

  it('initial renders correctly', () => {
    setup({ hasClickedCreate: false });
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(MainHeader).exists()).toBe(false);
    expect(wrapper.find(SpotifyTopMusic).exists()).toBe(false);
  });

  describe('conditional renders', () => {
    it('renders MainHeader and SpotifyTopMusic if hasClickedCreate', () => {
      setup({ hasClickedCreate: true });
      const wrapper = shallow((<App />));
      expect(wrapper.find(MainHeader).exists()).toBe(true);
      expect(wrapper.find(SpotifyTopMusic).exists()).toBe(true);
    })
  })
});
