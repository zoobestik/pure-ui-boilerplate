/* env node */
import { DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import babelrc from '../.babelrc';

const pwd = process.cwd();

export const generate = () => ({
    entry: './src/client',

    module: {
        rules: [
            {
                type: 'javascript/auto',
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { ...babelrc },
                },
            },
            {
                test: /\.p?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            camelCase: true,
                            modules: true,
                            importLoaders: 2,
                            localIdentName: '[folder]__[local]-[hash:base64:6]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => [
                                postcssPresetEnv,
                            ],
                        },
                    },
                ],
            },
        ],
    },

    resolve: {
        mainFields: ['browser', 'main', 'module'],
        extensions: ['"*"', '.browser.mjs', '.mjs', '.js', '.json', '.css'],
    },

    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
        },
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], pwd),

        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].chunk.css',
        }),
    ],
});

export default generate();
