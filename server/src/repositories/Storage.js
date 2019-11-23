/**
 * Reads the data firts time and then stores the the data in memory
 */

const { dataset } = require ('../../config')
const { readFile, parseJson } = require ('../utils')
const { chain, map, resolve } = require ('fluture')

// Store the content of the file in memory
let cache = null

/** saveToCache :: a -> a */
const saveToCache = data => cache = data || data

/** getData :: () -> Future Error a */
const data = () =>
  cache !== null
    ? resolve (cache)
    : map (saveToCache) (chain (parseJson) (readFile (dataset)))

module.exports = {
  data
}
