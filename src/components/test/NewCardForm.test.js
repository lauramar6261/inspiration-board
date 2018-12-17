import React from 'react';
import NewCardForm from '../NewCardForm';
import { shallow } from 'enzyme';

describe('Card', () => {

  it('will match the NewCardForm Snapshot', () => {
    const wrapper = shallow(<NewCardForm addCardCallback={() => {}}/>)
    expect(wrapper).toMatchSnapshot();
  });
});
