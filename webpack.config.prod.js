const path = require('path');
const webpack = require('webpack')


const javascriptEntryPath = path.resolve(__dirname, 'src', 'index.js');
const htmlEntryPath = path.resolve(__dirname, 'src', 'index.html');
const buildPath = path.resolve(__dirname, 'public', 'build');

module.exports = {
    entry: [
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
            loaders: ['babel?presets[]=react,presets[]=es2015'],
        }, {
            test: /\.html$/,
            loader: 'file?name=[name].[ext]',
        }],
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                comparisons: true,
                conditionals: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                screw_ie8: true,
                sequences: true,
                unused: true,
                warnings: false,
            },
            output: {comments: false},
        })

    ]
}
