/* eslint-disable */
let webpack = require('webpack');
let path = require('path');
// let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({
    size: 4
});

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

let config = {
    entry: {
        'index': './dev/index.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../dist')
    },
    optimization: {
             splitChunks: {
           chunks: 'all'
         }
   },
    module: {
        rules: [
            {
                test: /\.worker\.js$/,
                use:'raw-loader'
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/,/\.worker\.js$/],
                use: 'happypack/loader?id=js'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(html|htm)$/i,
                use: 'html-withimg-loader'
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // outputPath: '/imgs',
                        publicPath: '../',
                        name: 'imgs/[name].[ext]',
                        limit: 8 * 1024
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.less'],
        alias: {
            '@': resolve('src')
        }
    },
    plugins: [
        new HappyPack({
            id: 'js',
            verbose: false,
            threadPool: happyThreadPool,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            "targets": {
                                "browsers": [
                                    "chrome >= 50",
                                    "safari >= 10",
                                    "firefox >= 50",
                                    "ie >= 10"
                                ]
                            },
                            "debug": true,
                            "useBuiltIns": "usage"
                        }]],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import',
                            [
                                '@babel/plugin-proposal-decorators',
                                {
                                    legacy: true
                                }
                            ],
                            [
                                '@babel/plugin-proposal-class-properties',
                                {
                                    loose: true
                                }
                            ],
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    helpers: false,
                                    corejs: 3
                                }
                            ],
                            '@babel/plugin-transform-async-to-generator',
                        ]
                    }
                }
            ]
        })
    ]
};

module.exports = config;
