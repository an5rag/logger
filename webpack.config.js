"use strict";
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var webpack = require("webpack");

var isDevelopmentMode = process.env.NODE_ENV === "development";
var BUILD_DIR = path.resolve(__dirname, "build/scripts");
var APP_DIR = path.resolve(__dirname, "src/");

var config = {
  entry: {
    app: [
      // "react-hot-loader/patch",
      // // activate HMR for React

      // "webpack-dev-server/client?http://localhost:3000",
      // // bundle the client for webpack-dev-server
      // // and connect to the provided endpoint

      // "webpack/hot/only-dev-server",
      // // bundle the client for hot reloading
      // // only- means to only hot reload for successful updates

      APP_DIR + "/scripts/index.jsx"
      // js files
    ],
    vendor: ["react", "react-dom", "react-hot-loader"]
  },

  output: {
    path: BUILD_DIR,
    filename: "bundle.js",
    publicPath: "/build/"
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: isDevelopmentMode ? "inline-source-map" : "nosources-source-map",
  // enable source maps

  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["es2015", { modules: false }],
                // webpack understands the native import syntax, and uses it for tree shaking
                // https://webpack.js.org/guides/hmr-react/#babel-config
                "stage-2",
                "react"
              ],
              plugins: ["react-hot-loader/babel"]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader", // The css-loader interprets @import and url() like import/require() and will resolve them
              options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader", // Loads a SASS/SCSS file and and compiles it to CSS
              options: {
                sourceMap: true
              }
            }
          ],

          fallback: "style-loader" // Adds CSS to the DOM by injecting a <style> tag
          // use style-loader when not extracting (for eg: in development)
        })
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js"
    }),
    // code splitting for vendor

    new ExtractTextPlugin({
      filename: "styles/bundle.css",
      disable: isDevelopmentMode
    }),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDevelopmentMode ? JSON.stringify("development") : JSON.stringify("production")
      }
    })
    // This will produce output bundles that has all instances of process.env.NODE_ENV replaced with the conditional string literal
  ],

  devServer: {
    host: "localhost",
    port: 3000,

    historyApiFallback: true,
    // respond to 404s with index.html

    hot: true
    // enable HMR on the server
  },

  resolve: {
    extensions: [".js", ".json", ".jsx"],
    alias: {
      buildingBlocks: path.resolve(__dirname, "src", "scripts", "buildingBlocks")
    }
  }
};

module.exports = config;
