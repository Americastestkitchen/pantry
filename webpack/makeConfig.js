import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import constants from './constants';
import path from 'path';
import webpack from 'webpack';
import ip from 'ip';

const devtools = process.env.CONTINUOUS_INTEGRATION
  ? 'inline-source-map'
  // cheap-module-eval-source-map, because we want original source, but we don't
  // care about columns, which makes this devtool faster than eval-source-map.
  // http://webpack.github.io/docs/configuration.html#devtool
  : 'cheap-module-eval-source-map';

const loaders = {
  css: '',
  less: '!less-loader',
  scss: '!sass-loader',
  sass: '!sass-loader?indentedSyntax',
  styl: '!stylus-loader'
};

const serverIp = ip.address();

export default function makeConfig(isDevelopment) {
  function stylesLoaders() {
    return Object.keys(loaders).map(ext => {
      const prefix = 'css-loader!postcss-loader';
      const extLoaders = prefix + loaders[ext];
      const loader = isDevelopment
        ? `style-loader!${extLoaders}`
        : ExtractTextPlugin.extract('style-loader', extLoaders);
      return {
        loader,
        test: new RegExp(`\\.(${ext})$`)
      };
    });
  }

  const config = {
    hotPort: constants.HOT_RELOAD_PORT,
    cache: isDevelopment,
    debug: isDevelopment,
    devtool: isDevelopment ? devtools : '',
    entry: {
      app: isDevelopment ? [
        `webpack-hot-middleware/client?path=http://${serverIp}:${constants.HOT_RELOAD_PORT}/__webpack_hmr`, // eslint-disable-line max-len
        path.join(constants.APP_DIR, 'browser/main.js')
      ] : [
        path.join(constants.APP_DIR, 'browser/main.js')
      ]
    },
    module: {
      loaders: [{
        loader: 'url-loader?limit=10000',
        test: /\.(gif|jpg|png|svg)$/
      }, {
        loader: 'url-loader?limit=1',
        test: /favicon\.ico$/
      }, {
        loader: 'url-loader?limit=100000',
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/
      }, {
        test: /\.js$/,
        exclude: constants.NODE_MODULES_DIR,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime', 'add-module-exports'],
          presets: ['es2015', 'react', 'stage-1'],
          env: {
            development: {
              presets: ['react-hmre']
            }
          }
        },
      }].concat(stylesLoaders())
    },
    output: isDevelopment ? {
      path: constants.BUILD_DIR,
      filename: '[name].js',
      chunkFilename: '[name]-[chunkhash].js',
      publicPath: `http://${serverIp}:${constants.HOT_RELOAD_PORT}/build/`
    } : {
      path: constants.BUILD_DIR,
      filename: '[name]-[hash].js',
      chunkFilename: '[name]-[chunkhash].js'
    },
    plugins: (() => {
      const plugins = [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production'),
            IS_BROWSER: true
          }
        })
      ];
      if (isDevelopment) {
        plugins.push(
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoErrorsPlugin()
        );
      } else {
       plugins.push(
         // Render styles into separate cacheable file to prevent FOUC and
         // optimize for critical rendering path.
         new ExtractTextPlugin('app-[hash].css', {
           allChunks: true
         }),
         new webpack.optimize.DedupePlugin(),
         new webpack.optimize.OccurenceOrderPlugin(),
         new webpack.optimize.UglifyJsPlugin({
           compress: {
             screw_ie8: true, // eslint-disable-line camelcase
             warnings: false // Because uglify reports irrelevant warnings.
           }
         })
       );
      }
      return plugins;
    })(),
    postcss: () => [autoprefixer({browsers: 'last 2 version'})],
    resolve: {
      extensions: ['', '.js', '.json'],
      modulesDirectories: ['app', 'node_modules'],
      root: constants.ABSOLUTE_BASE,
      alias: {
        react$: require.resolve(path.join(constants.NODE_MODULES_DIR, 'react'))
      }
    }
  };

  return config;
};
