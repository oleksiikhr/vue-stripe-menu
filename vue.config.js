'use strict'

const packageJson = require('./package')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? `/${packageJson.name}/`
    : '/'
}
