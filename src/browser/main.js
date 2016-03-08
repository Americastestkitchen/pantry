/* eslint-disable import/default */
import 'babel-polyfill';
import Bluebird from 'bluebird';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/configureStore';
import createEngine from 'redux-storage-engine-localstorage';
import createRoutes from './createRoutes';
import {IntlProvider} from 'react-intl';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {browserHistory} from 'react-router';
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux';

// Enabling ES7 `async/await` in browser:
if (process.env.IS_BROWSER) require('regenerator/runtime');
// http://bluebirdjs.com/docs/why-bluebird.html
window.Promise = Bluebird;

const app = document.getElementById('app');
const engine = createEngine('este-app');
const initialState = window.__INITIAL_STATE__;
const store = configureStore({
  engine,
  initialState,
  platformMiddleware: [routerMiddleware(browserHistory)]
});
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store.getState);

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
      <Router history={history}>
        {routes}
      </Router>
    </IntlProvider>
  </Provider>,
  app
);
