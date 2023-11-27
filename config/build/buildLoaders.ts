import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";


export function buildLoaders (options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development'

    const assetLouder = {
      test: /\.(png|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    }

    const svgrLoader = {
      test: /\.svg$/i,
      use: [
        { 
          loader: '@svgr/webpack',
          options: { 
            icon: true,
            svgConfig: {
                plugins: [
                  {
                    name: 'convertColors',
                    params: {
                      currentColor: true,
                    }
                  }
                ]
            }
          }
        }
      ],
      }
    

    const cssLouderWithModules = {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
          },
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, 
          cssLouderWithModules, 
          "sass-loader",],
      }
    // const tsLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    //   } 

     const tsLoader = {
      exclude: /node_modules/,
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
              })
        }
      }
      ],
      } 

      const babelLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env", 
              "@babel/preset-typescript",
              ["@babel/preset-react" , {
                runtime: isDev ? 'automatic' : 'classic'
              }]
            ]
          }
        }
      }

    return [
      assetLouder,
        scssLoader,
        // tsLoader,
        babelLoader,
        svgrLoader,
    ]
}