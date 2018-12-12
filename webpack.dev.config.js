/**
 * Created by 2087 on 2018/8/20.
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry:path.join(__dirname, './src/index.js'),
    output:{
        filename: 'js/[name].js',
        path: path.join(__dirname, './dev-bundle/'),
        chunkFilename: '[name].js',
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        rules: [{
            test: /\.css$/,
            exclude: [path.resolve(__dirname, './node_modules'),path.resolve(__dirname, './src/jq-component')],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]", "postcss-loader"]
            })
        },{
            test: /\.less$/,
            exclude: [path.resolve(__dirname, './node_modules'),path.resolve(__dirname, './src/jq-component')],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]", "postcss-loader", `less-loader`]
            })
        },{
            test: /\.css$/,
            include: [path.resolve(__dirname, './node_modules'),path.resolve(__dirname, './src/jq-component')],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "postcss-loader"]
            })
        },{
            test: /\.less$/,
            include: [path.resolve(__dirname, './node_modules'),path.resolve(__dirname, './src/jq-component')],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "postcss-loader", `less-loader`]
            })
        },{
            test: /\.(js|jsx)$/,
            use: [{
                loader:'babel-loader?cacheDirectory=true',
            }],
            include: path.join(__dirname, './src')
        },{
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name:'images/[name].[ext]',
                    publicPath:'/'
                }
            }]
        },{
            test: /\.(woff|svg|eot|TTF|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name:'font/[name].[ext]',
                    publicPath:'/'
                }
            }]
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, './'),
        historyApiFallback: true,
        host: 'localhost',
        port: 14444,
        proxy: {
            '/api': {
                target:'http://127.0.0.1:8281',
                pathRewrite: {'^/api' : '/upms-web'}
            }
        },
        disableHostCheck: true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            showErrors: true,
            inject: 'body',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: 'lazy',
            minChunks: ({ resource } = {},count) => (
                resource &&
                resource.includes('node_modules') &&
                count >=2
            ),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].js',
            minChunks: function (module) {
                return (
                    module.resource &&
                    module.resource.indexOf(
                        path.join(__dirname, './node_modules')
                    ) === 0
                )
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'webpack-runtime',
            filename: 'js/webpack-runtime.js',
        }),
        new webpack.HashedModuleIdsPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks:true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"dev"'
            }
        })
    ]
};
