const { routes, methods, json } = require ('paperplane')
const kMean = require ('./k-mean')

const endpoints = {
  ...kMean
}

module.exports = routes ({
  '/': methods ({
    GET: () => Promise.resolve (json (Object.keys (endpoints)))
  }),
  ...endpoints
})