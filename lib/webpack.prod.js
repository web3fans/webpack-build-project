const cssnano = require("cssnano");
const merge = require("webpack-merge");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const baseConfig = require("./webpack.base");

const prodConfig = {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin({
      // assetNameRegExp: /\.css$/g,//常规写法
      assetNameRegExp: /\.opyimize\.css$/g,//只匹配压缩到的资源
      cssProcessor: cssnano,
      cssProcessorOptions:{//压缩处理器的配置
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true, //是否显示配置
    }),
    // new HtmlWebpackExternalsPlugin({//cdn引入react和react-dom事例
    //   externals: [
    //     {
    //       module: "react",
    //       entry: "https://11.url.cn/now/lib/16.2.0/react.min.js",
    //       global: "React"
    //     },
    //     {
    //       module: "react-dom",
    //       entry: "https://11.url.cn/now/lib/16.2.0/react-dom.min.js",
    //       global: "ReactDOM"
    //     }
    //   ]
    // })
  ],
  optimization: {
    optimization: {
      minimizer: [//针对js文件压缩的自定义配置
        new TerserWebpackPlugin({
          test: /\.js(\?.*)?$/i,
          exclude: /\/excludes/
        })
      ]
    },
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  }
};

module.exports = merge(baseConfig, prodConfig);
