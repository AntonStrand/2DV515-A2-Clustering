const { node, resolve, reject } = require ('fluture')
const fs = require ('fs')
const { isNil } = require ('ramda')
const { ifElse } = require ('./logic')

const { maybe_ } = require ('./sanctuary')

/** fromNullable :: a -> Fluture a a */
const fromNullable = ifElse (isNil) (reject) (resolve)

/** readFile :: String -> Fluture Error a */
const readFile = path => node (done => fs.readFile (path, 'utf8', done))

/** writeFile :: String -> a -> Fluture Error a */
const writeFile = path => data => node (done => fs.writeFile (path, data, done))

/** maybeToFuture :: Maybe a -> Future a */
const maybeToFuture = maybe_ (reject) (resolve)

module.exports = {
  readFile,
  writeFile,
  fromNullable,
  maybeToFuture
}
