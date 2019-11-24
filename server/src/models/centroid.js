/**
 * Centroid :: { wordCount :: {"Number", Number}, assignments :: [Blog] }
 */

const { lensPath, lensProp, set } = require ('ramda')

const assignments = lensProp ('assignments')

/** empty :: () -> Centroid */
const empty = () => ({ wordCount: {}, assignments: [] })

/** setWordCount :: Number -> Number -> Centriod -> Centriod */
const setWordCount = wordId => position => 
  set (lensPath ([ 'wordCount', `${wordId}` ])) (position)

/** clearAssignments :: Centroid -> Centroid */
const clearAssignments = set (assignments) ([]) 

module.exports = {
  setWordCount,
  clearAssignments,
  empty
}