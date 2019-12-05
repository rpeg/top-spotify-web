import React from 'react';
import { shallow } from 'enzyme';

import TrackGrid, { TrackRow, Track } from '../../components/TrackGrid';
import * as selectors from '../../reducers/selectors';
import {
  N_TRACKS, NUM_PER_ROW_DESKTOP, SM_WIDTH_BOUNDARY, NUM_PER_ROW_MOBILE,
} from '../../constants/constants';

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
  useState: () => jest.fn(),
}));

const setState = jest.fn();

const setup = (optimizeTracks = true) => {
  jest.spyOn(selectors, 'selectOptimizeTracks').mockReturnValue(optimizeTracks);
  jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState]);
};

const makeTracks = (count) => {
  const arr = [];

  for (let i = 0; i < count; i += 1) {
    const id = String.fromCharCode('a'.charCodeAt(0) + i);
    const track = {
      id,
      album: {
        id,
      },
    };

    arr.push(track);
  }

  return arr;
};

describe('TrackGrid', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should not log errors in console', () => {
    setup();
    const wrapper = shallow(<TrackGrid tracks={makeTracks(5)} count={5} />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should not render rows when count === 0', () => {
    setup();
    const wrapper = shallow(<TrackGrid tracks={makeTracks(5)} count={0} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(TrackRow).exists()).toBe(false);
  });

  it('should not render any duplicate-album tracks when optimizeTracks and count <= # of non-duplicate-album tracks', () => {
    setup(true);

    // duplicate album 'a'
    const tracks = [{ id: 'f', album: { id: 'a' } }].concat(makeTracks(5));
    const wrapper = shallow(<TrackGrid tracks={tracks} count={5} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should always render duplicate-album tracks when !optimizeTracks', () => {
    setup(false);

    // duplicate album 'a'
    const tracks = [{ id: 'f', album: { id: 'a' } }].concat(makeTracks(5));
    const wrapper = shallow(<TrackGrid tracks={tracks} count={5} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render expected number of rows on desktop width', () => {
    setup();

    window.innerWidth = SM_WIDTH_BOUNDARY + 50;

    for (let i = 1; i < N_TRACKS; i += 1) {
      const wrapper = shallow(<TrackGrid tracks={makeTracks(i)} count={i} />);
      expect(wrapper).toMatchSnapshot();

      const expectedLength = Math.ceil(i / NUM_PER_ROW_DESKTOP);
      expect(wrapper.find(TrackRow).length).toEqual(expectedLength);
    }
  });

  it('should render expected number of rows on mobile width', () => {
    setup();

    window.innerWidth = SM_WIDTH_BOUNDARY - 50;

    for (let i = 1; i < N_TRACKS; i += 1) {
      const wrapper = shallow(<TrackGrid tracks={makeTracks(i)} count={i} />);
      expect(wrapper).toMatchSnapshot();

      const expectedLength = Math.ceil(i / NUM_PER_ROW_MOBILE);
      expect(wrapper.find(TrackRow).length).toEqual(expectedLength);
    }
  });
});
