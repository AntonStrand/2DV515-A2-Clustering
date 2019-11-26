const { routes, methods, json } = require ('paperplane')
const kMean = require ('./k-mean')
const hierarchical = require ('./hierarchical')

const endpoints = {
  ...kMean,
  ...hierarchical
}

module.exports = routes ({
  '/': methods ({
    GET: () => Promise.resolve (json (Object.keys (endpoints)))
  }),
  ...endpoints
})