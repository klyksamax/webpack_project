import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin  from "copy-webpack-plugin";
import webpack, { Configuration, DefinePlugin } from "webpack";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BuildOptions } from "./types/types";
import path from "path";

export function buildPlugins ({mode, paths, platform}: BuildOptions): Configuration['plugins'] {

    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plagins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({ 
            template: paths.html,
            favicon: path.resolve(paths.public, 'favicon.ico')
        }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
        })
    ]

    if(isDev){
        plagins.push(new webpack.ProgressPlugin())
        plagins.push(new  ReactRefreshWebpackPlugin())
    }

    if(isProd){
        plagins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
          }))
        plagins.push(new CopyPlugin({
            patterns: [
              { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales')},
            ],
          }),)  
    }

    return plagins;
}