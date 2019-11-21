const { node, resolve, reject } = require('fluture')
const fs = require('fs')
const { isNil } = require('ramda')
const { ifElse } = require('./logic')

/** fromNullable :: a -> Fluture a a */
const fromNullable = ifElse (isNil) (reject) (resolve)

/** readFile :: String -> Fluture Error a */
const readFile = file => node (done => fs.readFile (file, 'utf8', done))

/** writeFile :: String -> String -> Fluture Error a */
const writeFile = file => data => node (done => fs.writeFile (file, data, done))

module.exports = {
  readFile,
  writeFile,
  fromNullable
}