const merge = require ('./merge')
const pearson = require ('../../metrics/pearson')
const { reduce, length, reject, first, append } = require ('list/curried')
const { pipe } = require ('ramda')
const { fromNullable } = require ('../../../utils')

// Closest :: { A: Cluster, B: Cluster, distance: Number }

/** getClosest :: Number -> [Cluster] -> Closest */
const getClosest = wordCount => clusters =>
  reduce ((nearest, A) =>
    reduce ((closest, B) => {
      if (A === B) return closest // no need to check distance if they are the same.
      const distance = pearson (wordCount) (A.blog) (B.blog)
      return (distance < closest.distance)
        ? { A, B, distance }
        : closest
    }) (nearest) (clusters)) ({ distance: Infinity }) (clusters)

/** updateClusters :: [Cluster] -> Closest -> [Cluster] */
const updateClusters = clusters => ({ A, B, distance }) =>
  append (merge (A) (B) (distance)) (reject (c => c === A || c === B) (clusters))

/** iterate :: Number -> (List Clusters) -> Future Cluster */
const iterate = (wordCount) => (clusters) =>
  length (clusters) <= 1
    ? fromNullable (first (clusters))
    : pipe (
      getClosest (wordCount),
      updateClusters (clusters),
      iterate (wordCount)
    ) (clusters)

module.exports = iterate