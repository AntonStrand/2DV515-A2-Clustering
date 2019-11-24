const { equals } = require ('ramda')

/**
 * Centroid
 */

function Centroid () {
  this.wordCount = {}
  this.assignments = []
  this.prevAssignments = []
}

Centroid.prototype.setWordCount = function (id, count) {
  this.wordCount[id] = count
}
Centroid.prototype.assign = function (blog) {
  this.assignments.push (blog)
}

Centroid.prototype.clearAssignments = function () {
  this.prevAssignments = this.assignments
  this.assignments = []
},
Centroid.prototype.isUnchanged = function () {
  return equals (this.assignments, this.prevAssignments)
} 

module.exports = {
  Centroid,

  /** assign :: Centriod -> Blog -> () */
  assign: centroid => blog => centroid.assign (blog),

  /** clearAssignments :: Centriod -> () */
  clearAssignments: centroid => centroid.clearAssignments (),

  /** isUnchanged :: Centriod -> Boolean */
  isUnchanged: centroid => centroid.isUnchanged ()
}