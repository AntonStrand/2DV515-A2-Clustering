const { node, resolve, reject, encase, ap, map } = require ('fluture')
const fs = require ('fs')
const { isNil } = require ('ramda')
const { ifElse } = require ('./logic')

/** fromNullable :: a -> Future a a */
const fromNullable = ifElse (isNil) (reject) (resolve)

/** readFile :: String -> Future Error a */
const readFile = path => node (done => fs.readFile (path, 'utf8', done))

/** writeFile :: String -> a -> Future Error a */
const writeFile = path => data => node (done => fs.writeFile (path, data, done))

/** parseJson :: a -> Future Error a */
const parseJson = encase (JSON.parse)

/** liftA2 :: Applicative f => (a -> b -> c) -> f a -> f b -> f c */
const liftA2 = fn => fa => fb => ap (fb) (map (fn) (fa))

module.exports = {
  readFile,
  writeFile,
  fromNullable,
  parseJson,
  liftA2
}
