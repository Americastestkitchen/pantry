import nconf from 'nconf';

/*
   Specifying an env delimiter allows you
   to override below config when shipping to production server.
*/

nconf.env('__');

/* never put production secrets in config. Use nconf. */
const config = {
  port: process.env.PORT || 8000,
  webpackStylesExtensions: ['css', 'less', 'sass', 'scss', 'styl'],
  node: { fs: 'empty' }
};

/*
   Use above config as a default one. Multiple other providers are available
   like loading config from json and more. Check out nconf docs.
*/

nconf.defaults(config);

export default nconf.get();
