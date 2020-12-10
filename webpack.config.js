<<<<<<< Updated upstream
=======
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');

>>>>>>> Stashed changes
module.exports = {
  mode: "development",
  entry: [
    "@babel/polyfill", // enables async-await
    "./client/index.js"
  ],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
<<<<<<< Updated upstream
=======
  plugins: [
    new BundleAnalyzerPlugin(),
    new CompressionWebpackPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.(js|css)$/,
    }),
  ],
>>>>>>> Stashed changes
  devtool: "source-map",
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /font-awesome\.config\.js/,
        use: [
          { loader: 'style-loader' },
          { loader: 'font-awesome-loader' }
        ]
      },
    ]
  }
};
