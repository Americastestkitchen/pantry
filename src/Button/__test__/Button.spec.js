import Button from '../Button.react';

import {
   expect,
   React,
   TestUtils
 } from '../../../test/mochaTestHelper';

describe('Button component', () => {
  function componentSetup() {
    const buttonComponent = TestUtils.renderIntoDocument(
      <Button text='i can haz text' />
    );

    return {
      buttonComponent: buttonComponent
    };
  };

  it('should exist', () => {
    const {buttonComponent} = componentSetup();
    expect(buttonComponent).toExist();
  });

  it('should render a button with appropriate text', () => {
    const {buttonComponent} = componentSetup();
    const button = TestUtils.findRenderedDOMComponentWithClass(
      buttonComponent,
      'button__button'
    );
    expect(button.textContent).toEqual('i can haz text');
  });
});
