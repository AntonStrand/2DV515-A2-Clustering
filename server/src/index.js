const http = require ('http')
const { mount, logger, cors } = require ('paperplane')
const { port } = require ('../config')

const routes = require ('./routes')

const app = cors (routes)
  
http
  .createServer (mount ({ app, logger }))
  .listen (port, () =>
    console.log (
      `\nServer is running on port ${ port }\nPress ctrl+c to terminate...\n`
    ))
