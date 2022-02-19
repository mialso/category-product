const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    entry: {
        app: './src/app/index.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: require.resolve('babel-loader'),
                    options: {
                        plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                    },
                }],
            },
            {
                test: /\.css$/i,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: [ '*', '.js', '.jsx' ],
        alias: {
            user: path.resolve(__dirname, './src/user'),
            category: path.resolve(__dirname, './src/category'),
            product: path.resolve(__dirname, './src/product'),
            app: path.resolve(__dirname, './src/app'),
            type: path.resolve(__dirname, './src/type'),
        },
    },
    output: {
        path: `${__dirname}/dist`,
        publicPath: '/',
        filename: 'app.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/render/index.html',
            inject: false,
            filename: 'index.html',
        }),
        isDevelopment && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    devServer: {
        static: {
            directory: './dist',
        },
        hot: true,
        liveReload: false,
        proxy: {
            '/api': 'http://localhost:5005',
        },
    },
    devtool: 'source-map',
};
