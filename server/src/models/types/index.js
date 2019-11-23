const Type = require ('union-type')
const { isList: { List } } = require ('list')

const Blog = Type ({
  of: {
    title: String,
    wordCount: Array // of Number
  }
})

const Centroid = ({
  of: {
    wordCount: List,
    assignments: List
  }
})

module.exports = {
  Blog,
  Centroid
}
