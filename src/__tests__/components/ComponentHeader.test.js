import React from 'react';
import { shallow } from 'enzyme';

import ComponentHeader from '../../components/ComponentHeader';

describe('ComponentHeader', () => {
  const title = 'Test';

  it('should not log errors in console', () => {
    const wrapper = shallow(<ComponentHeader title={title} />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<ComponentHeader title={title} />);
    expect(wrapper).toMatchSnapshot();
  });
});
