const { reduce } = require ('list/curried')
const { random } = require ('../../utils')
const { repeat, range, map, pipe } = require ('ramda')
const Centroid = require ('../centroid')

/** getWordRange :: (List Blog) -> Number -> WordRange  */
const getWordRange = blogs => i =>
  reduce (
    (r, blog) => ({
      min: Math.min (r.min, blog.wordCount[i]),
      max: Math.max (r.max, blog.wordCount[i])
    }),
    { min: Infinity, max: -Infinity },
    blogs
  )

/** getWordRanges :: [blogs] -> Number -> [WordRange] */
const getWordRanges = (blogs) => pipe (
  range (0),
  map (getWordRange (blogs)) 
)

/** initCentroids :: [WordRange] -> Number -> [Centroid] */
const initCentroids = k => ranges => 
  ranges.reduce ((cs, { min, max }, i) => 
    cs.map (Centroid.setWordCount (i) (random (min) (max)))
  , repeat (Centroid.empty ()) (k))

/** kMean :: wordCount -> Number -> Number -> (List Blog) -> (List Cluster) */
const kMean = k => maxIterations => wordCount => blogs => {
  // Generate K random centroids
  const centroids = initCentroids (k) (getWordRanges (blogs) (wordCount))
  return centroids
}

module.exports = kMean
