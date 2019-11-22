'use strict'

const { dataset } = require ('../../config')
const { readFile } = require('../utils')
const { Blog } = require ('../models/types')
const List = require ('list')
const { compose, map, prop } = require ('ramda')
const { encase, chain } = require ('fluture')

/** data :: Future Error a */
const data = chain (encase (JSON.parse)) (readFile (dataset))

/** toBlog :: ({ blogs :: [a] }) -> (List Blog) */
const toBlog = compose (map (Blog.of), List.from, prop ('blogs'))

/** getBlogs :: Future Error (List Blog) */
const getBlogs = map (toBlog) (data)

/** getWordCount :: Future Error Number */
const getWordCount = map (prop ('wordCount')) (data)

module.exports = {
  getBlogs,
  getWordCount
}
