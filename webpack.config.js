var path = require('path');

var APP_DIR = path.resolve(__dirname, 'app');

var COMPONENTS_DIR = path.resolve(__dirname, 'app/components');

var DIST = path.resolve(__dirname, 'dist');

var CUMULUS = path.resolve(__dirname, '../Cumulus/src');

var config = {
    entry: {
        main: APP_DIR + '/index.js'
    },
    output: {
        path: DIST,
        filename: '[name].bundle.js',
        loader: 'babel-loader'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader'
            },
            {
                test: /\.jsx?/,
                include: COMPONENTS_DIR,
                loader: 'babel-loader'
            }
        ]
    }
}

module.exports = config;