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
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [ '*', '.js', '.jsx' ],
        alias: {
            user: path.resolve(__dirname, './src/user'),
            category: path.resolve(__dirname, './src/category'),
            remote: path.resolve(__dirname, './src/app/remote'),
            ui: path.resolve(__dirname, './src/app'),
            tree: path.resolve(__dirname, './src/app/tree'),
        },
    },
    output: {
        path: `${__dirname}/dist`,
        publicPath: '/',
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        proxy: {
            '/api': 'http://localhost:5005',
        },
    },
    devtool: 'source-map',
};
