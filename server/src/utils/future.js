const { node, resolve, reject, encase } = require ('fluture')
const fs = require ('fs')
const { isNil } = require ('ramda')
const { ifElse } = require ('./logic')

const { maybe_ } = require ('./sanctuary')

/** fromNullable :: a -> Future a a */
const fromNullable = ifElse (isNil) (reject) (resolve)

/** readFile :: String -> Future Error a */
const readFile = path => node (done => fs.readFile (path, 'utf8', done))

/** writeFile :: String -> a -> Future Error a */
const writeFile = path => data => node (done => fs.writeFile (path, data, done))

/** maybeToFuture :: Maybe a -> Future a */
const maybeToFuture = maybe_ (reject) (resolve)

/** parseJson :: a -> Future Error a */
const parseJson = encase (JSON.parse)

module.exports = {
  readFile,
  writeFile,
  fromNullable,
  maybeToFuture,
  parseJson
}
