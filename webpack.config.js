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
                        plugins: [
                            // isDevelopment && require.resolve('react-refresh/babel'),
                        ].filter(Boolean),
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
            offer: path.resolve(__dirname, './src/offer'),
            app: path.resolve(__dirname, './src/app'),
            type: path.resolve(__dirname, './src/type'),
        },
        fallback: {
            process: require.resolve('process/browser'),
            zlib: require.resolve('browserify-zlib'),
            stream: require.resolve('stream-browserify'),
            util: require.resolve('util'),
            buffer: require.resolve('buffer'),
            asset: require.resolve('assert'),
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
        // isDevelopment && new ReactRefreshWebpackPlugin({ exclude: /\.render\/offer\/preview.jsx$/ }),
        new webpack.ProvidePlugin({
            Buffer: [ 'buffer', 'Buffer' ],
            process: 'process/browser',
        }),
    ].filter(Boolean),
    devServer: {
        static: {
            directory: './dist',
        },
        hot: false,
        liveReload: false,
        proxy: {
            '/api': 'http://localhost:5005',
        },
    },
    devtool: 'source-map',
};
