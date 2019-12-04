import React from 'react';
import { shallow } from 'enzyme';
import ReactWordcloud from 'react-wordcloud';

import WordCloud from '../../components/WordCloud';

describe('WordCloud', () => {
  it('should not log errors in console', () => {
    const wrapper = shallow(<WordCloud genres={['a']} count={1} />);
    const spy = jest.spyOn(global.console, 'error');
    expect(wrapper).not.toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does not render without genres', () => {
    const wrapper = shallow(<WordCloud genres={[]} count={5} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(ReactWordcloud).exists()).toBe(false);
  });

  it('does not render with count === 0', () => {
    const wrapper = shallow(<WordCloud genres={['a']} count={0} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(ReactWordcloud).exists()).toBe(false);
  });

  it('renders with genres and count > 0', () => {
    const wrapper = shallow(<WordCloud genres={['a', 'b', 'c', 'd', 'e']} count={5} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(ReactWordcloud).exists()).toBe(true);
  });
});
