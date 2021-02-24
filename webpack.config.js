const path = require('path')
const glob = require('glob')

module.exports = {
  mode: 'production',
  name: 'lenses',
  entry: glob
    .sync(path.join(__dirname, '*.js'))
    .filter((source) => !source.includes('webpack.config'))
    .reduce((entries, source) => {
      entries[path.basename(source)] = source

      return entries
    }, {}),
  output: {
    path: path.resolve('dist'),
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
}
