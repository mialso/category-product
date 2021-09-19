const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/app/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ],
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
        publicPath: 'http://localhost:8080/',
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    devServer: {
        static: {
            directory: './dist',
        },
        hot: true,
        proxy: {
            '/api': 'http://localhost:5005',
        },
    },
    devtool: 'source-map',
};
