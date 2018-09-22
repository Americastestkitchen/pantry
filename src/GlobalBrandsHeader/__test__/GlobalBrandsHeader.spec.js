import configureStore from '../../../app/common/configureStore';
import GlobalBrandsHeader from '../GlobalBrandsHeader.react';
import { Provider } from 'react-redux';

import {
   expect,
   React,
   TestUtils
 } from '../../../test/mochaTestHelper';

describe('GlobalBrandsHeader component', () => {
  function componentSetup() {
    const componentProps = {
      deviceType: 'desktop',
      user: {
        cta: 'upgrade',
        first_name: 'Tom',
        memberships_cancelled: []
      }
    };
    const store = configureStore({});
    return TestUtils.renderIntoDocument(
      <Provider store={store}>
        <GlobalBrandsHeader {...componentProps} />
      </Provider>
    );
  }

  it('should exist', () => {
    const component = componentSetup();
    expect(component).toExist();
  });

  it('should have 10 svg components', () => {
    const component = componentSetup();
    const elements = TestUtils.scryRenderedDOMComponentsWithTag(
      component,
      'svg'
    );
    expect(elements.length).toEqual(10);
  });
});
