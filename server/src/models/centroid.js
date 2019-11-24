/**
 * Centroid :: { wordCount :: {"Number", Number}, assignments :: [Blog] }
 */

const { append, lensPath, lensProp, set, over } = require ('ramda')

const assignments = lensProp ('assignments')

/** empty :: () -> Centroid */
const empty = () => ({ wordCount: {}, assignments: [] })

/** setWordCount :: Number -> Number -> Centriod -> Centriod */
const setWordCount = wordId => position => 
  set (lensPath ([ 'wordCount', `${wordId}` ])) (position)

/** clearAssignments :: Centroid -> Centroid */
const clearAssignments = set (assignments) ([])

/** assign :: Blog -> Centroid -> Centroid */
const assign = centroid => blog =>
  over (assignments) (append (blog)) (centroid)

module.exports = {
  setWordCount,
  clearAssignments,
  empty,
  assign
}