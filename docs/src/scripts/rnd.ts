'use strict'

/**
 * The maximum is inclusive and the minimum is inclusive.
 */
export default (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}
