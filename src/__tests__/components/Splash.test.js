import React from 'react';
import { shallow } from 'enzyme';

import Splash from '../../components/Splash';

describe('Splash', () => {
  it('should not log errors in console', () => {
    const wrapper = shallow(<Splash />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Splash />);
    expect(wrapper).toMatchSnapshot();
  });
});
