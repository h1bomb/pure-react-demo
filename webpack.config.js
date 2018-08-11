const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html模板文件引用插件
const CleanWebpackPlugin = require('clean-webpack-plugin');// 删除目录插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const FileListPlugin = require('./fileListPlugin');

process.env.BABEL_ENV = process.env.NODE_ENV || 'development';
const env = process.env.BABEL_ENV;
module.exports = {
  mode: env,
  resolve: {
    extensions: ['.js', '.jsx'], // 解析文件类型
  },
  entry: './src/index.jsx', // 打包入口
  // 模块解析规则
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/, // 解析文件类型
        exclude: /node_modules/, // 排除文件夹或文件
        use: {
          loader: 'babel-loader', // 解析插件
          options: {
            presets: ['react-app'], // 解析规则集，env对应babel-preset-env,主要用于JavaScript新特性适配,react对应babel-preset-react,主要用于jsx语法的解析
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'],
        include: [/node_modules/, /src/],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // commons: {
        //   chunks: 'initial',
        //   minChunks: 2,
        //   maxInitialRequests: 5, // The default limit is too small to showcase the effect
        //   minSize: 0, // This is example is too small to create commons chunks
        // },
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
        uglifyOptions: {
          compress: {
            pure_getters: true,
            side_effects: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  devtool: 'cheap-module-source-map',
  // devtool: 'inline-source-map', // 报错代码追踪
  devServer: {
    contentBase: './public', // 服务启动基础目录
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']), // 删除dist目录
    new HtmlWebpackPlugin({
      title: 'Development', // 页签名
      template: 'public/index.html', // 模板文件
      inject: 'body', // 生成文件自动插入方式
    }),
    new CopyWebpackPlugin([{
      from: 'public/*',
      ignore: ['*.html'],
      flatten: true,
      type: 'file',
    }]),
    new DashboardPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/app.[name].css',
      // chunkFilename: 'css/app.[contenthash:12].css',
    }),
    // new BundleAnalyzerPlugin(),
    new FileListPlugin(),
  ],
  output: {
    filename: '[name]-bundle.js', // 生成文件名
    chunkFilename: '[name].asyncbundle.js',
    path: path.resolve(__dirname, 'dist'), // 生成文件存放目录
  },
};
