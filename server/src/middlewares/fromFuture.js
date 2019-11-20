const { isFuture, fork } = require('fluture')

/* :: Store -> Function -> Action -> a */
module.exports = store => next => action =>
  action && isFuture(action) ? fork (store.dispatch) (store.dispatch) (action)
  : action && typeof action.fork === 'function' ? action.fork(store.dispatch, store.dispatch)
  : next(action)