const { methods, json } = require ('paperplane')
const kMean = require ('../models/algorithms/k-mean')
const { liftA2 } = require ('../utils')
const { getWordCount, getBlogs } = require ('../repositories')
const { pipe, propOr, map } = require ('ramda')
const { promise } = require ('fluture')

/** defaultTo :: a -> b -> a | b */
const defaultTo = or => x => x != null ? Number (x) : or

/** setDefaultIfNeeded :: Query -> [Number, Number] */
const setDefaultIfNeeded = q => [
  defaultTo (5) (q.clusters),
  defaultTo (50) (q.iterations)
]

/** getKMean :: [Number, Number] -> Future Error [Cluster] */
const getKMean = ([ k, maxIterations ]) =>
  liftA2 (kMean (k) (maxIterations)) (getWordCount ()) (getBlogs ())

/** cleanOutput :: [Cluster] -> [[Blog]] */
const cleanOutput = map (({ assignments }) => assignments.map (({ title }) => ({ title })))

/** k-mean :: Request -> Promise Error Response */
module.exports = {
  '/k-mean': methods ({
    GET: pipe (
      propOr ({}) ('query'),
      setDefaultIfNeeded,
      getKMean,
      map (cleanOutput),
      map (json),
      promise
    )
  })
}
