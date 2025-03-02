import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import HiddenCheckableInput from './hidden-checkable-input.component';

function render(props) {
  return TestRenderer.create(<HiddenCheckableInput { ...props } />);
}

describe('HiddenCheckableInput', () => {
  it('renders as expected', () => {
    expect(render({
      checked: true,
      helpId: 'test-help',
      inputName: 'test-name',
      inputType: 'test-type',
      inputValue: 'test-value',
      tabindex: 0
    })).toMatchSnapshot();
  });
});
