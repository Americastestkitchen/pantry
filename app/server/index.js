require('babel-register');

const serverConfig = require('./config');

if (!process.env.NODE_ENV) {
  /* eslint-disable max-len */
  throw new Error('Environment variable NODE_ENV isn\'t set. Remember it\'s up your production enviroment to set NODE_ENV and maybe other variables.');
  /* eslint-disable max-len */
}

/* To ignore webpack custom loaders on server. */
serverConfig.webpackStylesExtensions.forEach(ext => {
  require.extensions['.' + ext] = () => {}; // eslint-disable-line
});

require('./main');
