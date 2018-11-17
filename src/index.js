const http = require('http')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const config = require('./config/getConfig')

const server = http.createServer((req, res) => {
  const reqPath = path.join(config.root, req.url)
  fs.stat(reqPath, (err, status) => {
    if (err) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html')
      res.write('Not Found Page.')
      res.end()
      return
    }
    if (status.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      // 异步读取流文件
      fs.createReadStream(reqPath).pipe(res)
    } else if (status.isDirectory()) {
      fs.readdir(reqPath, (err, files) => {
        if (err) throw err
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end(files.join(','))
      })
    }
  })
})

server.listen(config.port, config.hostname, _ => {
  const addr = `http://${config.hostname}:${config.port}`
  console.log(`Server is running in ${chalk.green(addr)}`)
})
