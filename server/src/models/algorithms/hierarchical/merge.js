const Cluster = require ('../../types/Cluster')

/** averageBlog :: Blog -> Blog -> Blog */
const averageBlog = aB => bB =>
  aB.wordCount.reduce ((blog, aCount, i) => {
    blog.wordCount[i] = (bB.wordCount[i] + aCount) / 2
    return blog
  }, { wordCount: [] })

/** merge :: Cluster -> Cluster -> Number -> Cluster */
const merge = A => B => distance => 
  Cluster.of ({
    left: A,
    right: B,
    distance,
    blog: averageBlog (A.blog) (B.blog)
  })

module.exports = merge