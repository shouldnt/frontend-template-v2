const path = require('path');
var express = require('express');
var app = express();
var router = require('./router.js');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.dev.js');


// set the view engine to ejs

// use res.render to load up an ejs view file

var devServerEnabled = true;
if (devServerEnabled) {
    //reload=true:Enable auto reloading when changing JS files or content
    //timeout=1000:Time from disconnecting from server to reconnecting
    config.entry.index.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');

    //Add HMR plugin
    // config.plugins.push(new webpack.HotModuleReplacementPlugin());

    const compiler = webpack(config);

    //Enable "webpack-dev-middleware"

    app.use(webpackDevMiddleware(compiler, {
	        publicPath: config.output.publicPath
	 }));

    //Enable "webpack-hot-middleware"
    app.use(webpackHotMiddleware(compiler, {
    	// 'path'      : '/__webpack_hmr',
	 	'heartbeat' : 10 * 1000
    }));
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/src/pages'));  
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', router);

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');