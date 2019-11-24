const { isFuture, fork } = require ('fluture')

/* :: Store -> Function -> Action -> a */
module.exports = store => next => action =>
  action && isFuture (action)
    ? fork (store.dispatch) (store.dispatch) (action)
    : next (action)
