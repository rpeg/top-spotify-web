import React from 'react';
import { shallow } from 'enzyme';

import Donut from '../../components/Donut';

describe('Donut', () => {
  const items = ['a', 'b'];

  it('should not log errors in console', () => {
    const wrapper = shallow(<Donut items={items} />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Donut items={items} />);
    expect(wrapper).toMatchSnapshot();
  });
});
