const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const buildEntryPoint = function(entryPoint) {
  return [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    entryPoint,
  ]
};
const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  loader: ['css-loader', 'sass-loader'],
});
const cssConfig = isProd ? cssProd : cssDev;
const imgOptionsProd = {
    name: '[name]-[hash:12].[ext]',
    outputPath: '/img/',
    publicPath: path.resolve(__dirname, 'dist/'),
};
const imgOptionsDev = {
    name: '[name]-[hash:8].[ext]',
    outputPath: 'img/',
};
const imgOptions = isProd ? imgOptionsProd : imgOptionsDev;

module.exports = {
  entry: {
    main: isProd ? './src/views/main/main.js' : buildEntryPoint('./src/views/main/main.js'),
    contacts: isProd ? './src/views/contacts/contacts.js' : buildEntryPoint('./src/views/contacts/contacts.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'js/[name].bundle.js',
    publicPath: '/dist/',
  },
  devServer: {
    open: true,
    openPage: '',
    stats: 'errors-only',
    hot: true,
    inline: true,
    port: 8080,
  },
  devtool:'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'es2015',
              'stage-0',
            ],
            plugins: [
              'transform-runtime',
            ],
          },
        }
      },
      {
  			test: /\.js$/,
  			exclude: /(node_modules|bower_components)/,
  			use: 'eslint-loader',
  		},
      {
        test: /\.(scss|css)$/,
        use: cssConfig,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: imgOptions,
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 65,
              },
              pngquant: {
                quality: '10-20',
                speed: 4,
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                  {
                    removeEmptyAttrs: false,
                  }
                ]
              },
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
                interlaced: false,
              },
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('css/[name].bundle.css');
      },
      disable: !isProd,
      allChunks: true,
    }),
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
