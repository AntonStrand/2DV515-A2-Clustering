
function Cluster (params) {
  this.left = params.left
  this.right = params.right
  this.blog = params.blog
  this.distance = params.distance
}

module.exports = {
  of: (params) => new Cluster (params)
}