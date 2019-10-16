'use strict'

const packageJson = require('./package')
require('dotenv').config()

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? process.env.APP_BUILD_URL || `/${packageJson.name}/`
    : process.env.APP_BUILD_URL || '/'
}
