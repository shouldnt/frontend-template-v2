const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ejs = require('./webpack.ejs.js')();

module.exports = merge(common, {
   devtool: 'source-map',
   plugins: [
       new webpack.NamedModulesPlugin(),
       new MiniCssExtractPlugin({
            filename: 'css/build/[name].css',
            ignoreOrder: false
       }),
       ...ejs
   ],
    module: {
        rules: [{
            test: /\.(scss|sass)$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
            },
            {
                loader: "css-loader", options: {
                    url: false,
                    // minimize: true,
                    sourceMap: true
                }
            }, {
                loader: "postcss-loader", options: {
                    sourceMap: true
                }
            },{
                loader: "sass-loader", options: {
                    sourceMap: true
                }
            }]
            
        }, { 
            test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" 
        }, {
            test: /\.ejs$/, exclude: /node_modules/, 
            loader: "ejs-loader" 
        }]
    }
 });
