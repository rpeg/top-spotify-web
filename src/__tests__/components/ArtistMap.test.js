import React from 'react';
import { shallow } from 'enzyme';

import ArtistMap from '../../components/ArtistMap';

const items = [
  { artist: 'Demilich', country: 'Finland' },
  { artist: 'Darkthrone', country: 'Norway' },
  { artist: 'Autopsy', country: 'United States' },
  { artist: 'Blasphemy', country: 'Canada' },
  { artist: 'Peste Noire', country: 'France' }];

describe('ArtistMap', () => {
  it('should not log errors in console', () => {
    const wrapper = shallow(<ArtistMap artistCountries={items} />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<ArtistMap artistCountries={items} />);
    expect(wrapper).toMatchSnapshot();
  });
});
