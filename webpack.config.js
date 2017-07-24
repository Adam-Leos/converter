const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const buildEntryPoint = function(entryPoint) {
  return [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    entryPoint,
  ]
};
console.log(process.env.NODE_ENV);
const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  loader: ['css-loader', 'sass-loader'],
  publicPath: './dist',
});
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    main: isProd ? './src/views/main/main.js' : buildEntryPoint('./src/views/main/main.js'),
    information: isProd ? './src/views/information/information.js' : buildEntryPoint('./src/views/information/information.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/js/'),
    filename: '[name].bundle.js',
    publicPath: 'dist/js/',
  },
  devServer: {
    open: true,
    openPage: '',
    stats: 'errors-only',
    hot: true,
    inline: true,
    port: 3000,
  },
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
        use: 'file-loader?name=[path][name].[ext]',
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath('../css/[name].bundle.css');
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
