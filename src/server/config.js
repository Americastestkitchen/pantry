import nconf from 'nconf';

import dotenv from 'dotenv';

dotenv.load();

const isProduction = process.env.NODE_ENV === 'production';

/*
   Specifying an env delimiter allows you
   to override below config when shipping to production server.
*/

nconf.env('__');

/* never put production secrets in config. Use nconf. */
const config = {
  isProduction: isProduction,
  googleAnalyticsId: 'UA-XXXXXXX-X',
  port: process.env.PORT || 8000,
  webpackStylesExtensions: ['css', 'less', 'sass', 'scss', 'styl'],
  node: {fs: 'empty'}
};

/*
   Use above config as a default one. Multiple other providers are available
   like loading config from json and more. Check out nconf docs.
*/

nconf.defaults(config);

export default nconf.get();
