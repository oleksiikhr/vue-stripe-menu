'use strict'

require('dotenv').config()

const packageJson = require('./package')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.APP_BUILD_URL || `/${packageJson.name}/`
    : process.env.APP_BUILD_URL || '/'
}
