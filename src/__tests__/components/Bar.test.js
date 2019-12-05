import React from 'react';
import { shallow } from 'enzyme';

import Bar from '../../components/Bar';

describe('Bar', () => {
  const items = ['a', 'b'];

  it('should not log errors in console', () => {
    const wrapper = shallow(<Bar items={items} />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Bar items={items} />);
    expect(wrapper).toMatchSnapshot();
  });
});
