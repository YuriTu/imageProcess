/* eslint-disable */
let fs = require('fs');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
    let htmlWebpackPluginConfig = [];
    htmlWebpackPluginConfig.push(new HtmlWebpackPlugin({
        template: './dev/public/index.html',
        hash: true,
        inject: true
    }));

    return htmlWebpackPluginConfig;
};
