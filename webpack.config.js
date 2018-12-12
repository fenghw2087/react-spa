/**
 * Created by 2087 on 2018/8/20.
 */
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outputBasePath = path.join(__dirname, './dist/');

module.exports = {
    entry:path.join(__dirname, './src/index.js'),
    output:{
        filename: 'js/[name]-[chunkhash].js',
        path: outputBasePath,
        chunkFilename: 'js/[name]-[chunkhash].js',
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
                use: ["css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]&minimize", "postcss-loader"]
            })
        },{
            test: /\.less$/,
            exclude: [path.resolve(__dirname, './node_modules'),path.resolve(__dirname, './src/jq-component')],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]&minimize", "postcss-loader", `less-loader`]
            })
        },{
            test: /\.css$/,
            include: [path.resolve(__dirname, './node_modules'),path.resolve(__dirname, './src/jq-component')],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?minimize", "postcss-loader"]
            })
        },{
            test: /\.less$/,
            include: [path.resolve(__dirname, './node_modules'),path.resolve(__dirname, './src/jq-component')],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?minimize", "postcss-loader", `less-loader`]
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
    plugins:[
        new CleanWebpackPlugin([
            path.join(outputBasePath, 'js/*.js'),
            path.join(outputBasePath, 'css/*.css'),
            path.join(outputBasePath, 'images/*.*'),
            path.join(outputBasePath, 'font/*.*')
        ],{
            root: path.join(__dirname, './'),
            verbose: true
        }),
        new UglifyJSPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename:  'html/index.html',
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
            filename: 'js/[name]-[chunkhash].js',
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
            filename: 'js/webpack-runtime.[hash].js', // 注意runtime只能用[hash]
        }),
        new webpack.HashedModuleIdsPlugin(),
        new ExtractTextPlugin({
            filename: 'css/[name]-[chunkhash].css',
            allChunks:true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ]
};
