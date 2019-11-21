const { foldl } = require('list')

/** getWordRange :: (List Blog) -> Number -> { min: Number, max: Number }  */
const getWordRange = blogs => i => 
  foldl((r, blog) => ({
      min: Math.min (r.min, blog.wordCount[i]),
      max: Math.max (r.max, blog.wordCount[i])
    }),
    { min: Infinity, max: -Infinity },
    blogs
  )

/** kMean :: Number -> Number -> (List Blog) -> (List Cluster) */
const kMean = k => maxIterations => blogs => {
  throw new Error('K-mean is not implemented')
}

module.exports = kMean
