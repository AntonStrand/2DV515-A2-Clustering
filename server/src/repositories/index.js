'use strict'

const { Blog } = require ('../models/types')
const { prop, pipe } = require ('../utils/sanctuary')
const { map } = require ('fluture')
const List = require ('list')
const Storage = require ('./Storage')

/** toBlog :: ({ blogs :: [a] }) -> (List Blog) */
const toBlog = pipe ([
  prop ('blogs'),
  List.from,
  map (Blog.of)
])

/** getBlogs :: Future Error (List Blog) */
const getBlogs = map (toBlog) (Storage.data ())

/** getWordCount :: Future Error Number */
const getWordCount = map (prop ('wordCount')) (Storage.data ())

module.exports = {
  getBlogs,
  getWordCount
}
