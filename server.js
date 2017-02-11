import path from 'path';
import express from 'express';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8080 : process.env.PORT;
const app = express();

if (isDeveloping) {
    console.info('💄 Setting up development environment...');

    let webpack = require('webpack');
    let webpackMiddleware = require('webpack-dev-middleware');
    let webpackHotMiddleware = require('webpack-hot-middleware');
    let config = require('./webpack.config.js');

    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true,
        quiet: false,
        lazy: false,
        stats: {
            colors: true,
        }
    });

    const bundlePath = path.join(__dirname, './public/build/index.html');

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('*', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(bundlePath));
        res.end();
    });


} else {
    const staticPath = path.join(__dirname, 'public/build');
    app.use(express.static(staticPath));
}

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }

    if(isDeveloping){
        console.info('Development Environment setup complete. 💋');
        console.info('webpack-hot-middleware compiler watching src. express listening on http://0.0.0.0:%s/', port);
    } else {
        console.info('Production Environment');
        console.info('express listening on http://0.0.0.0:%s/', port);
    }
});
