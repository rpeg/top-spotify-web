import React from 'react';
import { shallow } from 'enzyme';

import { Container } from 'react-bootstrap';
import MainHeader from '../../components/MainHeader';
import * as selectors from '../../reducers/selectors';

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}));

const setup = ({ user = {} }) => {
  jest.spyOn(selectors, 'selectUser').mockReturnValue(user);
};

describe('MainHeader', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should not log errors in console', () => {
    setup({});
    const wrapper = shallow(<MainHeader />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly without user', () => {
    setup({});
    const wrapper = shallow(<MainHeader />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Container).exists()).toBe(false);
  });

  it('renders correctly with user', () => {
    const user = {
      id: 'abc',
    };

    setup({ user });

    const wrapper = shallow(<MainHeader />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Container).exists()).toBe(true);
  });
});
