import configureStore from '../../../app/common/configureStore';
import GlobalAccountHeader from '../GlobalAccountHeader.react';
import { Provider } from 'react-redux';

import {
   expect,
   React,
   TestUtils
 } from '../../../test/mochaTestHelper';

describe('GlobalAccountHeader component', () => {
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
        <GlobalAccountHeader {...componentProps} />
      </Provider>
    );
  }

  it('should exist', () => {
    const component = componentSetup();
    expect(component).toExist();
  });
});
