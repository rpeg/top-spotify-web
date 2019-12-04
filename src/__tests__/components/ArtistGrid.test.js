import React from 'react';
import { shallow } from 'enzyme';

import ArtistGrid from '../../components/ArtistGrid';

describe('ArtistGrid', () => {
  it('should not log errors in console', () => {
    const wrapper = shallow(<ArtistGrid />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does not render without artists', () => {
    const wrapper = shallow(<ArtistGrid />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with artists', () => {
    const artists = [
      {
        id: 'abc',
        name: 'A',
      },
      {
        id: 'cde',
        name: 'B',
      },
      {
        id: 'fgh',
        name: 'C',
      },
      {
        id: 'ijk',
        name: 'D',
      },
      {
        id: 'lmn',
        name: 'E',
      },
    ];

    const wrapper = shallow(<ArtistGrid artists={artists} />);
    expect(wrapper).toMatchSnapshot();
  });
});
