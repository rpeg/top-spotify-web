import React from 'react';
import { shallow } from 'enzyme';

import TrackGrid, { TrackRow } from '../../components/TrackGrid';
import * as selectors from '../../reducers/selectors';
import { N_TRACKS, NUM_PER_ROW_DESKTOP } from '../../constants/constants';

jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => jest.fn(),
}));

const setup = (optimizeTracks = true) => {
  jest.spyOn(selectors, 'selectOptimizeTracks').mockReturnValue(optimizeTracks);
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

  it('should render expected number of rows on desktop width', () => {
    setup();

    for (let i = 1; i < N_TRACKS; i += 1) {
      const wrapper = shallow(<TrackGrid tracks={makeTracks(i)} count={i} />);
      expect(wrapper).toMatchSnapshot();

      const expectedLength = Math.ceil(i / NUM_PER_ROW_DESKTOP);
      expect(wrapper.find(TrackRow).length).toEqual(expectedLength);
    }
  });
});
