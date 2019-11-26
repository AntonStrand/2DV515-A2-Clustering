const Cluster = require ('../../types/Cluster')
const iterate = require ('./iterate')
const { pipe } = require ('ramda')
const { map } = require ('list/curried')

/** blogsToClusters :: (List Blog) -> (List Cluster) */
const blogsToClusters = map (blog => Cluster.of ({ blog }))

/** Number -> [Blog] -> Future ClusterTree */
module.exports = wordCount => pipe (
  blogsToClusters,
  iterate (wordCount)
)