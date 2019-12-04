import React from 'react';
import { shallow } from 'enzyme';

import Profile from '../../components/Profile';
import * as selectors from '../../reducers/selectors';

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}));

const setup = (displayProfile = false) => {
  jest.spyOn(selectors, 'selectDisplayProfile').mockReturnValue(displayProfile);
};

describe('Profile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should not log errors in console', () => {
    setup(true);
    const wrapper = shallow(<Profile />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly with !displayProfile', () => {
    setup(false);
    const user = { id: 'abc' };

    const wrapper = shallow(<Profile user={user} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').exists()).toBe(false);
  });

  it('renders correctly with displayProfile', () => {
    setup(true);

    const user = { id: 'abc' };

    const wrapper = shallow(<Profile user={user} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').exists()).toBe(true);
  });

  it('renders correctly without user', () => {
    setup(true);

    const wrapper = shallow(<Profile />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').exists()).toBe(false);
  });

  it('renders correctly with user', () => {
    setup(true);

    const user = { id: 'abc' };

    const wrapper = shallow(<Profile user={user} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').exists()).toBe(true);
  });
});
