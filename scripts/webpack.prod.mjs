import { optimize } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import CSSOCompressPlugin from 'csso-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { generate } from './webpack';

const { ModuleConcatenationPlugin, OccurrenceOrderPlugin } = optimize;

const base = generate();

export default {
    ...base,

    devtool: 'source-map',

    plugins: [
        ...base.plugins,

        new OccurrenceOrderPlugin(),
        new ModuleConcatenationPlugin(),

        new BrotliPlugin({
            asset: '[path].br[query]',
            test: /\.(js|css|svg)$/,
            threshold: 10240,
        }),

        new CSSOCompressPlugin(),

        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
        }),
    ],

    optimization: {
        ...base.optimization,
        minimizer: [
            ...(base.optimization.minimizer || []),

            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
        ],
    },
};
