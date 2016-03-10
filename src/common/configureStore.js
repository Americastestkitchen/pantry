import appReducer from './app/reducer';
import createLogger from 'redux-logger';
import fetch from './fetch';
import injectDependencies from './lib/injectDependencies';
import promiseMiddleware from 'redux-promise-middleware';
import shortid from 'shortid';
import validate from './validate';
import { applyMiddleware, compose, createStore } from 'redux';

const BROWSER_DEVELOPMENT = (
  process.env.NODE_ENV !== 'production' && // eslint-disable-line no-undef
  process.env.IS_BROWSER // eslint-disable-line no-undef
);

export default function configureStore({deps, initialState}) {
  // Inject services for actions.
  const getUid = () => shortid.generate();
  const now = () => Date.now();
  const dependenciesMiddleware = injectDependencies(
    { ...deps, fetch, getUid, now },
    { validate }
  );

  const middleware = [
    dependenciesMiddleware,
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    })
  ];

  if (BROWSER_DEVELOPMENT) {
    const logger = createLogger({
      collapsed: true,
      // Convert immutablejs to JSON.
      stateTransformer: state => JSON.parse(JSON.stringify(state))
    });
    // Logger must be the last middleware in chain.
    middleware.push(logger);
  }

  const createReduxStore = (BROWSER_DEVELOPMENT && window.devToolsExtension)
    ? compose(
      applyMiddleware(...middleware),
      window.devToolsExtension()) // eslint-disable-line no-undef
    : applyMiddleware(...middleware);

  const store = createReduxStore(createStore)(appReducer, initialState);

  // Enable hot reload where available.
  if (module.hot) { // eslint-disable-line no-undef
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('./app/reducer', () => { // eslint-disable-line no-undef
      const nextAppReducer = require('./app/reducer'); // eslint-disable-line no-undef
      store.replaceReducer(nextAppReducer);
    });
  }

  return store;
}
