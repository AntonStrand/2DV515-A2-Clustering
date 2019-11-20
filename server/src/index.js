const http = require('http')
const { mount, logger, routes, methods, json } = require('paperplane')
const { composeP, map } = require('ramda')
const F = require('fluture')
const port = 3001

const endpoints = routes({
  '/': methods({
    GET: () => F.resolve({ message: 'Hello from API' })
  })
})

const app = composeP (map (json), endpoints)

const middleware = [
  require('./middlewares/fromFuture')
]


http
  .createServer(mount({ app, logger, middleware }))
  .listen(port, () =>
    console.log(
      '\nServer is running on port ' + port + '\nPress ctrl+c to terminate...\n'
    )
  )
