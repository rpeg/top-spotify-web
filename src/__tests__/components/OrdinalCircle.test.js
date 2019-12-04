import React from 'react';
import { shallow } from 'enzyme';

import OrdinalCircle from '../../components/OrdinalCircle';

describe('OrdinalCircle', () => {
  const position = 1;

  it('should not log errors in console', () => {
    const wrapper = shallow(<OrdinalCircle position={position} />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<OrdinalCircle position={position} />);
    expect(wrapper).toMatchSnapshot();
  });
});
