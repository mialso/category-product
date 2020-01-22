const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [ 'babel-loader' ],
            },
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ],
            },
        ],
    },
    resolve: {
        extensions: [ '*', '.js', '.jsx' ],
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
    },
};
