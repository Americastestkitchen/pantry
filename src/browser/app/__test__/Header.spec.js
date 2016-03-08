import Header from '../Header.react';

import {
   expect,
   React,
   TestUtils
 } from '../../../../test/mochaTestHelper';

describe('Header component', () => {
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

  let headerComponent, headerEle;

  function componentProps() {
    return {
      msg: msg,
      pathname: '/'
    };
  };

  beforeEach(() => {
    headerComponent = TestUtils.renderIntoDocument(<Header {...componentProps()} />);
    headerEle = TestUtils.findRenderedDOMComponentWithTag(headerComponent, 'h1');
  });

  it('should have one h1 element', () => {
    expect(headerEle).toExist;
  });
});
