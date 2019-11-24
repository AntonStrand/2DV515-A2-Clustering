const { reduce, forEach } = require ('list/curried')
const { random } = require ('../../utils')
const pearson = require ('../metrics/pearson')
const { range, map, pipe, flip, forEach: forE, all: every } = require ('ramda')
const { Centroid, clearAssignments, assign, isUnchanged } = require ('../types/Centroid')

const all = flip (every)
const forAll = flip (forE)

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
const initCentroids = k => ranges => {
  const centroids = []

  for (let i=0; i<k; i++) {
    centroids[i] = new Centroid ()
    ranges.forEach (({ min, max }, idx) =>
      centroids[i].setWordCount (idx, random (min) (max)))
  }

  return centroids
}

/** assignToCentroid :: [Blog] -> [Centroid] -> [Centroid] */
const assignToCentroid = wordCount => blogs => centroids => {
  const calcDistance = pearson (wordCount)
  
  forEach (blog => {
    let distance = Infinity
    let closest
    //Find closest centroid
    forAll (centroids) (c => {
      const cDist = calcDistance (blog) (c)
      if (cDist < distance) {
        closest = c
        distance = cDist
      }
    })
    //Assign blog to centroid
    assign (closest) (blog)
  }) (blogs)
}

const average = wordIdx => ({ assignments }) => 
  (assignments.reduce ((sum, blog) => sum + blog.wordCount[wordIdx], 0) / assignments.length)

const updatePositions = wordCount => centroids => {
  for (let i=0; i < wordCount; i++) {
    forAll (centroids) (c =>
      c.setWordCount (i, average (i) (c)))
  }
}

/** kMean :: Number -> Number -> Number -> (List Blog) -> [Cluster] */
const kMean = k => maxIterations => wordCount => blogs => {
  // Generate K random centroids
  const centroids = initCentroids (k) (getWordRanges (blogs) (wordCount))

  for (let i=0; i < maxIterations; i++) {
    forAll (centroids) (clearAssignments)
    assignToCentroid (wordCount) (blogs) (centroids)
    updatePositions (wordCount) (centroids)
    if (all (centroids) (isUnchanged)) break
  }

  return centroids
}

module.exports = kMean
