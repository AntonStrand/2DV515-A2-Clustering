const { reduce, forEach } = require ('list/curried')
const { random } = require ('../../utils')
const pearson = require ('../metrics/pearson')
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
    cs.map (c => Centroid.setWordCount (i) (random (min) (max)) (c))
  , repeat (Centroid.empty ()) (k))

/** assignToCentroid :: [Blog] -> [Centroid] -> [Centroid] */
const assignToCentroid = wordCount => blogs => centroids => {
  const calcDistance = pearson (wordCount)
  const cs = centroids.slice (0)
  let index = 0
  
  forEach (blog => {
    let distance = Infinity
    let closest
    //Find closest centroid
    cs.forEach ((c, i) => {
      const cDist = calcDistance (blog) (c)
      if (cDist < distance) {
        closest = c
        distance = cDist
        index = i
      }
    })
    //Assign blog to centroid
    cs[index] = Centroid.assign (closest) (blog)
  }) (blogs)

  return cs
}

const average = wordIdx => ({ assignments }) => 
  (assignments.reduce ((sum, blog) => sum + blog.wordCount[wordIdx], 0) / assignments.length)

const updatePosition = wordIdx => centroid => 
  Centroid.setWordCount (wordIdx) (average (wordIdx) (centroid)) (centroid)

const updatePositions = wordCount => centroids => {
  const cs = centroids.slice (0)
  for (let i=0; i < wordCount; i++) {
    cs.forEach ((c, idx) => cs[idx] = updatePosition (i) (c))
  }
  return cs
}

/** kMean :: wordCount -> Number -> Number -> (List Blog) -> (List Cluster) */
const kMean = k => maxIterations => wordCount => blogs => {
  // Generate K random centroids
  let centroids = initCentroids (k) (getWordRanges (blogs) (wordCount))
  
  let i = 0

  while (i < maxIterations) {
    centroids = centroids.map (Centroid.clearAssignments)
    centroids = assignToCentroid (wordCount) (blogs) (centroids)
    centroids = updatePositions (wordCount) (centroids)
    i++
  }

  return centroids.map ((c, i) => ({ index: i, assignments: c.assignments.map (a => ({ title: a.title })) }))
}

module.exports = kMean
