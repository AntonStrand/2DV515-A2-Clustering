const { methods, json } = require ('paperplane')
const { getWordCount, getBlogs } = require ('../repositories')
const { pipe, map } = require ('ramda')
const { promise } = require ('fluture')
const { liftC2 } = require ('../utils')

const hierarchical = require ('../models/algorithms/hierarchical')

// Will be set to Promise JSON Response after first request
let cache = null

/** setCache :: a -> a */
const setCache = x => (cache = x) || x

/** cleanClusterTree :: Cluster -> ResponseTree */
const cleanClusterTree = cluster => {
  if (cluster.left != null) cleanClusterTree (cluster.left)
  if (cluster.right != null) cleanClusterTree (cluster.right)
  cluster.blog = cluster.blog.title
  cluster.distance = undefined
  return cluster
}

/** getHierarchical :: () -> Promise Error Response */
const getHierarchical = pipe (
  getBlogs,
  liftC2 (hierarchical) (getWordCount ()),
  map (cleanClusterTree),
  map (json),
  promise,
  setCache
)

/** hierarchical :: Request -> Promise Error Response */
module.exports = {
  '/hierarchical': methods ({
    GET: () => cache || getHierarchical ()
  })
}
