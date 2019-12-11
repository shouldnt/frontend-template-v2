const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
var os = require( 'os' );
var routerList = require('./routerList');
// var networkInterfaces = os.networkInterfaces();
// console.log(networkInterfaces);
function buildRouterlist() {
    return routerList.map(function(rout) {
        if (rout == "/") {
            rout = "index";
        }
        return './src/pages/' + rout + '.ejs';
    })
}

module.exports = merge(common, {
    entry: {
        index: [...buildRouterlist(), 'webpack-hot-middleware/client'],
    },
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        // allowedHosts: 'localhost',
        contentBase: ['./dist', './src/pages'],

        watchContentBase: true,
        // host: '192.168.1.183',
        // port: 8080,
        compress: true,
        watch: true,
        watchOptions: {
            ignored: ["./dist/css/build", "./dist/js", "./dist/packages"]
        },
        hot: true
   },
    plugins: [
       new webpack.NamedModulesPlugin(),
       new webpack.HotModuleReplacementPlugin()
   ],
    module: {
        rules: [{
            test: /\.(scss|sass)$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader", options: {
                    url: false,
                    sourceMap: true
                }
            }, 
            // {
            //     loader: "postcss-loader", options: {
            //         sourceMap: true
            //     }
            // },
            {
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
        }, { 
            test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" 
        }, {
            test: /\.ejs$/, 
            use: 'ejs-loader',
        }]
    }
 });
