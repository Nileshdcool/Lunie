const express = require('express')
const http = require('http')
const cors = require('cors')
const {message} = require('./lib/routes');
const {transaction} = require('./lib/routes');
const config = require('./config')

if (config.SENTRY_DSN) {
  const Sentry = require('@sentry/node')
  Sentry.init({
    dsn: config.SENTRY_DSN,
    release: require('./package.json').version
  })
}

async function main() {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(express.json());

  app.use(config.transactionPath, cors(), transaction);
  app.use(config.testApiPath, cors(), message);

  httpServer.listen({ port: config.port }, () => {
    console.log(`service ready at ${config.port}`)
  })
}

main()
