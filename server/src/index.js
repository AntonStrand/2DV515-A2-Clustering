const http = require ('http')
const { mount, logger, routes, methods, json } = require ('paperplane')
const { composeP, map } = require ('ramda')
const { getWordCount, getBlogs } = require ('./repositories')
const { port } = require ('../config')
const kMean = require ('./models/algorithms/k-mean')
const { lift2 } = require ('./utils/sanctuary')

const endpoints = routes ({
  '/': methods ({
    GET: () => map (count => ({ count })) (getWordCount ())
  }),
  '/blogs': methods ({
    GET: getBlogs
  }),
  '/k-mean': methods ({
    GET: () => lift2 (kMean (2) (0)) (getWordCount ()) (getBlogs ())
  })
})

const app = composeP (
  map (json),
  endpoints
)

const middleware = [ require ('./middleware/fromFuture') ]

http
  .createServer (mount ({ app, logger, middleware }))
  .listen (port, () =>
    console.log (
      `\nServer is running on port ${ port }\nPress ctrl+c to terminate...\n`
    ))
