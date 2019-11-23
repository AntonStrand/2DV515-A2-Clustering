/**
 * Reads the data firts time and then stores the the data in memory
 */

const { dataset } = require ('../../config')
const { readFile, maybeToFuture } = require ('../utils')
const { chain, map, encase } = require ('fluture')
const { pipe, Nothing, Just, isJust } = require ('../utils/sanctuary')

// Store the content of the file in memory
let cache = Nothing

/** saveToCache :: a -> a */
const saveToCache = data => {
  cache = Just (data)
  return data
}

/** getData :: () -> Future Error a */
const data = () =>
  isJust (cache)
    ? maybeToFuture (cache)
    : pipe ([
      readFile,
      chain (encase (JSON.parse)),
      map (saveToCache)
    ]) (dataset)

module.exports = {
  data
}
