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

  let headerComponent, headerEle, linkList, linkElements;

  function componentProps() {
    return {
      msg: msg,
      pathname: '/'
    };
  };

  beforeEach(() => {
    headerComponent = TestUtils.renderIntoDocument(<Header {...componentProps()} />);
    headerEle = TestUtils.findRenderedDOMComponentWithTag(headerComponent, 'h1');
    linkList = TestUtils.findRenderedDOMComponentWithTag(headerComponent, 'ul');
    linkElements = TestUtils.scryRenderedDOMComponentsWithTag(headerComponent, 'a');
  });

  it('should have one h1 element', () => {
    expect(headerEle).toExist;
  });

  it('should have two links', () => {
    expect(linkElements.length).toEqual(2);
  });

  it('should have one ul element ', () => {
    expect(linkList).toExist;
  });
});
