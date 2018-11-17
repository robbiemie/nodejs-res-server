const http = require('http')
const chalk = require('chalk')
const path = require('path')
const router = require('./utils/router')
const config = require('./config/getConfig')
const open = require('./utils/openUrl')

const server = http.createServer((req, res) => {
  const reqPath = path.join(config.root, req.url)
  router(req, res, reqPath)
})

server.listen(config.port, config.hostname, () => {
  const addr = `http://${config.hostname}:${config.port}`
  open(addr)
  console.log(`Server is running in ${chalk.green(addr)}`)
})
