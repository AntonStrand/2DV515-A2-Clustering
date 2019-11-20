const R = require('ramda')
const fs = require('fs')
const { node, resolve, reject, chain, map, fork } = require('fluture')

const ifElse = (pred, onT, onF) => x => pred(x) ? onT(x) : onF(x)

/** readFile :: String -> Fluture e a */
const readFile = file => node (done => fs.readFile (file, 'utf8', done))

/** writeFile :: String -> String -> Fluture e a */
const writeFile = file => data => node (done => fs.writeFile (file, data, done))

/** fromNullable :: a -> Fluture a a */
const fromNullable = ifElse(R.isNil, reject, resolve)

/** notEmptyRow :: String -> Boolean */
const notEmptyRow = row => row !== ''

/** toRow :: String -> [String] */
const toRow = R.split('\n')

/** toColumn :: [String] -> [[String]] */
const toColumns = R.map (R.split ('\t'))

/** toWords :: [[String]] -> [String] */
const toWords = R.compose (R.tail, R.head)

const toBlog = row => ({
  title: R.head (row),
  wordCount: R.map (Number) (R.tail (row))
})

/** format :: [[String]] -> { wordCount: Number, words: [String], blogs: { title: String, wordCount: Number }} */
const format = rows => ({
  wordCount: toWords (rows).length,
  words: toWords (rows),
  blogs: R.map (toBlog) (R.tail (rows))
})

/** transformToJSON :: String -> String */
const transformToJSON = R.pipe(
  toRow,
  R.filter (notEmptyRow),
  toColumns,
  format,
  JSON.stringify
)

/** main :: String -> () */
const main = saveTo => R.pipe(
  fromNullable,
  chain (readFile),
  map (transformToJSON),
  chain (writeFile (saveTo)),
  fork (e => console.log('\nThe conversion failed.\n', e, '\n'))
       (() => console.log('\nThe data has been converted to a JSON file\n'))
)

main (process.argv[3]) (process.argv[2])
