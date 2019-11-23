'use strict'

const { map, prop, pipe } = require ('../utils/sanctuary')
const List = require ('list')
const Storage = require ('./Storage')

/** toBlogs :: { blogs :: [Blog] } -> (List Blog) */
const toBlogs = pipe ([
  prop ('blogs'),
  List.from
])

/** getBlogs :: Future Error (List Blog) */
const getBlogs = () => map (toBlogs) (Storage.data ())

/** getWordCount :: Future Error Number */
const getWordCount = () => map (prop ('wordCount')) (Storage.data ())

module.exports = {
  getBlogs,
  getWordCount
}
