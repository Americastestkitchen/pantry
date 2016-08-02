import LinkBase from '../LinkBase.react';

import {
   expect,
   React,
   TestUtils
 } from '../../../test/mochaTestHelper';

describe('Link component', () => {
  let hasClicked = false;
  const props = {
    className: 'link-class',
    deviceType: 'desktop',
    href: 'http://www.onlinecookingschool.com',
    onClick: () => {
      hasClicked = true;
    }
  };
  const text = 'School!';

  function componentSetup() {
    return TestUtils.renderIntoDocument(
      <LinkBase {...props}>
        {text}
      </LinkBase>
    );
  }

  it('should exist', () => {
    expect(componentSetup()).toExist();
  });

  it('should have the correct className', () => {
    const component = componentSetup();
    expect(component.props.className).toEqual(props.className);
  });

  it('should render with the appropriate text', () => {
    const component = componentSetup();
    expect(component.props.children).toEqual(text);
  });

  it('should listen for a click event', () => {
    const component = componentSetup();
    component.props.onClick();
    expect(hasClicked).toEqual(true);
  });
});
