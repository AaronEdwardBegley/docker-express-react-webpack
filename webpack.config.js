const path = require('path');
const webpack = require('webpack');

const javascriptEntryPath = path.resolve(__dirname, 'src/client/', 'index.js');
const htmlEntryPath = path.resolve(__dirname, 'src/client/', 'index.html');
const buildPath = path.resolve(__dirname, 'public', 'build');

module.exports = {
    entry: [
        'webpack-hot-middleware/client?reload=true',
        javascriptEntryPath,
        htmlEntryPath
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
        }, {
            test: /\.html$/,
            loader: 'file?name=[name].[ext]',
        }],
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
    ]
};
