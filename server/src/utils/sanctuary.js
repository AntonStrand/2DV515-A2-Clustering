/**
 * Adding Fluture types to sanctuary
 */
const $ = require ('sanctuary-def')
const { env } = require ('fluture-sanctuary-types')
const S = require ('sanctuary')
module.exports = S.create ({ checkTypes: true, env: $.env.concat (env) })