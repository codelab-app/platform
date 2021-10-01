const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const configFile = path.resolve(__dirname, 'tsconfig.e2e.json')
const node_modules = path.resolve(process.cwd(), 'node_modules')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        configFile,
      }),
    ],
    // https://github.com/microsoft/monaco-editor-webpack-plugin/issues/90
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [new MonacoWebpackPlugin()],
  // in order to ignore built-in modules like path, fs,
  // target: 'node',
  // in order to ignore all modules in node_modules folder
  // externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            // '@babel/preset-react',
            // '@babel/preset-typescript',
            // '@babel/preset-env',
            '@nrwl/react/babel',
            // '@emotion/babel-preset-css-prop',
          ],
          // plugins: ['@emotion', 'macros'],
          ignore: [/node_modules/],
        },
        exclude: /node_modules/,
      },
      /**
       * Required for `monaco-editor`
       */
      {
        test: /\.ttf$/,
        use: ['file-loader'],
        exclude: /node_modules\/(?!monaco-editor\/).*/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules\/(?!monaco-editor\/).*/,
      },
    ],
  },
}
