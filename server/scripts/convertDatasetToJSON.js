const { map, filter, head, tail, pipe, split, length } = require ('ramda')
const { chain, fork } = require ('fluture')
const { fromNullable, readFile, writeFile } = require ('../src/utils')

/** notEmptyRow :: String -> Boolean */
const notEmptyRow = row => row !== ''

/** toRow :: String -> [String] */
const toRow = split ('\n')

/** toColumn :: [String] -> [[String]] */
const toColumns = map (split ('\t'))

/** toWords :: [[String]] -> [String] */
const toWords = pipe (head, tail)

/** toBlog :: [String] -> { title: String, wordCount: [Number] } */
const toBlog = row => ({
  title: head (row),
  wordCount: map (Number) (tail (row))
})

/** format :: [[String]] -> { wordCount: Number, words: [String], blogs: { title: String, wordCount: [Number] }} */
const format = rows => ({
  wordCount: length (toWords (rows)),
  words: toWords (rows),
  blogs: map (toBlog) (tail (rows))
})

/** transformToJSON :: String -> String */
const transformToJSON = pipe (
  toRow,
  filter (notEmptyRow),
  toColumns,
  format,
  JSON.stringify
)

/** main :: String -> () */
const main = saveTo => pipe (
  fromNullable,
  chain (readFile),
  map (transformToJSON),
  chain (writeFile (saveTo)),
  fork (e => console.log ('\nThe conversion failed.\n', e, '\n'))
  (() => console.log ('\nThe data has been converted to a JSON file\n'))
)

main (process.argv[3]) (process.argv[2])
