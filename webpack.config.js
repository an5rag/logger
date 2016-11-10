var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'build/scripts');
var APP_DIR = path.resolve(__dirname, 'src/scripts');

var config = {
    entry: APP_DIR + '/index.jsx',
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.scss'],
        modulesDirectories: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ],
        alias: {
            buildingBlocks: path.resolve(__dirname, "src", "scripts", "buildingBlocks")
        }
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    }
};

module.exports = config;
