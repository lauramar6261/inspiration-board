import React from 'react';
import Card from '../Card';
import { shallow } from 'enzyme';

describe('Card', () => {

  it('will match the Card Snapshot', () => {
    const wrapper = shallow( <Card
      text="hello test"
      emoji=":)"
      id={500}
    /> );

    expect(wrapper).toMatchSnapshot();
  });
});
