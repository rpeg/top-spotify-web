import React from 'react';
import { shallow } from 'enzyme';

import Radar from '../../components/Radar';

describe('Radar', () => {
  const features = [];

  it('should not log errors in console', () => {
    const wrapper = shallow(<Radar features={features} />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Radar features={features} />);
    expect(wrapper).toMatchSnapshot();
  });
});
