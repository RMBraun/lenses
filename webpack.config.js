const path = require('path')
const glob = require('glob')

const baseConfig = {
  mode: 'production',
  name: 'lenses',
  entry: glob
    .sync(path.join(__dirname, '*.js'))
    .filter((source) => !source.includes('webpack.config'))
    .reduce((entries, source) => {
      entries[path.basename(source).replace('.js', '')] = source

      return entries
    }, {}),
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /tests|node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: { ie: '11' } }]],
            plugins: ['@babel/plugin-transform-arrow-functions'],
          },
        },
      },
    ],
  },
}

const webMin = {
  ...baseConfig,
  output: {
    path: path.resolve('dist'),
    filename: '[name].min.js',
  },
}

const webDev = {
  ...baseConfig,
  optimization: {
    minimize: false,
  },
  output: {
    path: path.resolve('dist'),
  },
  module: {}
}

const sfcc = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    path: path.resolve('sfcc'),
    iife: false,
    libraryTarget: 'commonjs',
    environment: {
      arrowFunction: false,
      const: false,
      destructuring: false,
    },
  },
}

module.exports = [sfcc, webMin, webDev]
