var path = require('path');
var webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV  || 'development';

let config = {
    mode: env,
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/[name].[hash].bundle.js',
    },
    module: {
        rules: [{
            test: /\.less|\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader?name=/static/[name].[hash].[ext]'
                }, {
                    loader: 'less-loader?name=/static/[name].[hash].[ext]', options: {
                        strictMath: true,
                        noIeCompat: true
                    }
                }, {
                    loader: 'postcss-loader?name=/static/[name].[hash].[ext]',
                    options: {
                        plugins: () => [require('autoprefixer')]
                    }
                },

            ]
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                {
                    loader: 'img-loader',
                    options: {
                        name: './static/[name].[hash].[ext]',
                    }
                },
                {
                    loader: 'file-loader',
                    options: {
                        name: './static/[name].[hash].[ext]',
                    }
                }
            ],
            
        },
        {
            test: /\.(eot|woff2?|ttf|svg|otf)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[name]-[hash:5].min.[ext]",
                  limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                  publicPath: "fonts/",
                  outputPath: "fonts/"
                }
              }
            ]
        },
        {
            test: /\.m?js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.ejs'
        }),
        new MiniCssExtractPlugin({
            filename: "./[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            sourceMap: true,
            uglifyOptions: {
              mangle: {
                keep_fnames: true,
              },
              compress: {
                warnings: false,
              },
              output: {
                beautify: false,
              },
            },
          }),
    ],
    resolve: {
        alias: {
            images: './src/images'
        }
    }
};

process.env.ANALYSIS == 'true' && config.plugins.push(new BundleAnalyzerPlugin());

module.exports = config;