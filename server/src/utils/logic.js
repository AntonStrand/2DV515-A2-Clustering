'use strict'

/** ifElse :: (a -> Boolean) -> (a -> b) -> (a -> c) -> a -> b | c */
const ifElse = pred => onT => onF => x => pred (x) ? onT (x) : onF (x)

module.exports = {
  ifElse
}