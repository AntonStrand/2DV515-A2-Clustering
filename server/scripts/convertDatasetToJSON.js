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

/** main :: String -> () */
const main = saveTo => R.pipe(
  fromNullable,
  chain(readFile),
  map(R.split('\n')),
  map(R.map(R.split('\t'))),
  map(R.filter(row => R.head(row) !== '')),
  map(rows => ({ words: R.tail(R.head(rows)), blogs: R.tail(rows).map(R.zipObj(R.head(rows)))})),
  map(data => ({ ...data, blogs: data.blogs.map(row => ({ title: row.Blog, wordCount: R.tail(Object.values(row)).map(Number)}))})),
  map(JSON.stringify),
  chain(writeFile(saveTo)),
  fork(e => console.log('The conversion failed.\n', e, '\n'))
      (() => console.log('The data has been converted to a JSON file\n'))
)

main(process.argv[3])(process.argv[2])
