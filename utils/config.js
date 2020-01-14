
 /*if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  PORT = process.env.TEST_PORT
  MONGODB_URI = process.env.TEST_MONGODB_URI
}*/

require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  mongoUrl = process.env.TEST_MONGODB_URI
}


/* NPM START testi
require('dotenv').config()
let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI */

module.exports = {
  MONGODB_URI,
  PORT
}