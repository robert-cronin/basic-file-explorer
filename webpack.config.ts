// simple configuration for react and typescript

import webpack from 'webpack'
// import webpack dev server
import webpackDevServer from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config: webpack.Configuration = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist',
    },
    // html template file
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    devtool: 'source-map',
    devServer: {
        open: true,
        hot: true,
        port: 3000,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        fallback: {
            path: require.resolve('path-browserify'),
            fs: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            // scss
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
}

export default config
