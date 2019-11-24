'use strict'

/** ifElse :: (a -> Boolean) -> (a -> b) -> (a -> c) -> a -> b | c */
const ifElse = pred => onT => onF => x => pred (x) ? onT (x) : onF (x)

/** random :: Number -> Number -> Number */
const random = from => to => from + Math.random () * (to-from)

module.exports = {
  ifElse,
  random
}
