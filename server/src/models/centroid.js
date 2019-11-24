// const Centroid = ({
//   of: {
//     wordCount: Object,
//     assignments: []
//   }
// })

const of = (wordCount) => (assignments) => ({ wordCount, assignments })
const empty = () => ({ wordCount: {}, assignments: [] })

const { lensPath, lensProp, set } = require ('ramda')

const assignments = lensProp ('assignments')

/** setWordCount :: Number -> Number -> Centriod -> Centriod */
const setWordCount = wordId => position => 
  set (lensPath ([ 'wordCount', `${wordId}` ])) (position)

const clearAssignments = set (assignments) ([]) 

module.exports = {
  setWordCount,
  clearAssignments,
  of,
  empty
}