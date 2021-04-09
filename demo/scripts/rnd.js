'use strict'

/**
 * The maximum is inclusive and the minimum is inclusive
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export default (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}
