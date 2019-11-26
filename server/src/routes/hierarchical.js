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
const flattenClusterTree = cluster => {
  let left, right
  if (cluster.left != null) left = flattenClusterTree (cluster.left)
  if (cluster.right != null) right = flattenClusterTree (cluster.right)
  
  if (left) {
    cluster.children = cluster.children ? [ ...cluster.children, left ] : [ left ]
  }
  if (right) {
    cluster.children = cluster.children ? [ ...cluster.children, right ] : [ right ]
  }
  
  return { title: cluster.blog.title, children: cluster.children }
}

/** getHierarchical :: () -> Promise Error Response */
const getHierarchical = pipe (
  getBlogs,
  liftC2 (hierarchical) (getWordCount ()),
  map (flattenClusterTree),
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
