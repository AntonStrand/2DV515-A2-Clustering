'use strict'

const List = require ('list')
const Storage = require ('./Storage')
const { pipe, map, prop } = require ('ramda')

/** toBlogs :: { blogs :: [Blog] } -> (List Blog) */
const toBlogs = pipe (prop ('blogs'), List.from)

/** getBlogs :: () -> Future Error (List Blog) */
const getBlogs = pipe (Storage.data, map (toBlogs))

/** getWordCount :: () -> Future Error Number */
const getWordCount = pipe (Storage.data, map (prop ('wordCount')))

module.exports = {
  getBlogs,
  getWordCount
}
