import React from 'react';
import { shallow } from 'enzyme';

import OAuth from '../../components/OAuth';
import * as selectors from '../../reducers/selectors';

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}));

const setup = ({ user = {} }) => {
  jest.spyOn(selectors, 'selectUser').mockReturnValue(user);
};

const socket = { id: 'abc', on: () => {} };

describe('OAuth', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should not log errors in console', () => {
    setup({});
    const wrapper = shallow(<OAuth socket={socket} />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly without user', () => {
    setup({});
    const wrapper = shallow(<OAuth socket={socket} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.button-login').exists()).toBe(true);
    expect(wrapper.find('.button-logout').exists()).toBe(false);
  });

  it('renders correctly with user', () => {
    setup({
      user: {
        id: 'abc',
      },
    });

    const wrapper = shallow(<OAuth socket={socket} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.button-login').exists()).toBe(false);
    expect(wrapper.find('.button-logout').exists()).toBe(true);
  });
});
