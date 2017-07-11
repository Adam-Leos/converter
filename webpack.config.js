const path = require('path');

module.exports = {
  entry: {
    main: './src/js/main.js',
    anotherPage: './src/js/anotherPage.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: './dist',
  },
  watch: true,
  devServer: {
    open: true,
    stats: 'errors-only',
    hot: true,
    inline: true,
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
              'stage-0'
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
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
    ]
  }
};
