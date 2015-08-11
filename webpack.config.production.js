var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
  externals: {
    react: 'React'
  },
  devtool: 'eval',
  entry: [
  //'webpack-dev-server/client?http://localhost:3000',
  //'webpack/hot/only-dev-server',
  './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
  //new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
      exclude: [node_modules_dir],
      loaders: [
                //'react-hot',
                'babel?optional[]=runtime&stage=0'] // The module to load. "babel" is short for "babel-loader"
    },{
      test: /\.(woff|eot|ttf|svg|woff2)$/,
      loader: 'url?limit=10'
    },
    { test: /\.(png|jpg)$/, loader: 'url?limit=1000'},
    {
        test: /\.less$/,
        loader: "style!css!less"
      }],
    include: path.join(__dirname, 'src')
  }
};