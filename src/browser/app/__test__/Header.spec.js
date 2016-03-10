import Header from '../Header.react';

import {
   expect,
   React,
   TestUtils
 } from '../../../../test/mochaTestHelper';

describe('Header component', () => {
  function componentSetup() {
    const msg = {
      app: {
        footer: {
          madeByHtml: '<a href="#">footer link</a>',
        },
        links: {
          home: 'Home',
          todos: 'Todos'
        }
      }
    };

    const componentProps = {
      msg,
      pathname: '/'
    };

    const headerComponent = TestUtils.renderIntoDocument(
      <Header {...componentProps} />
    );

    return {
      headerComponent
    }
  };


  it('should have one h1 element', () => {
    const {headerComponent} = componentSetup();
    const headerEle = TestUtils.findRenderedDOMComponentWithTag(
      headerComponent,
      'h1'
    );
    expect(headerEle).toExist();
  });
});
