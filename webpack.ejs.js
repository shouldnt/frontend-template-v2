const HtmlPlugin = require('html-webpack-plugin')
const path = require('path');
var fs = require('fs');
// fs.createReadStream('test.log').pipe(fs.createWriteStream('newLog.log'));
const ejsList = require('./routerList.js')


// don't touch this
module.exports = function() {
	let list = []

	return ejsList.map(function(filename) {
		var name = filename == "/" ? "index" : filename;
		return new HtmlPlugin({
			filename: './'+ name + '.html',
			template: './src/pages/' + name + '.ejs',
			inject: 'body'
		});
	})
}