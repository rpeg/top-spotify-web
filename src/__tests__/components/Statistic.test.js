import React from 'react';
import { shallow } from 'enzyme';

import Statistic from '../../components/Statistic';

describe('Statistic', () => {
  it('should not log errors in console', () => {
    const wrapper = shallow(<Statistic />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly without title', () => {
    const wrapper = shallow(<Statistic />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.stat-title').exists()).toBe(false);
  });

  it('renders correctly with title', () => {
    const wrapper = shallow(<Statistic title="abc" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.stat-title').exists()).toBe(true);
  });
});
