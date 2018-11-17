const fs = require('fs')
const chalk = require('chalk')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

module.exports = async (req, res, reqPath) => {
  try {
    const status = await stat(reqPath)
    if (status.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      // 异步读取流文件
      fs.createReadStream(reqPath).pipe(res)
    } else if (status.isDirectory()) {
      const files = await readdir(reqPath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end(files.join(','))
      return
    }
  } catch (err) {
    if (err) {
      console.log(chalk.red(err))
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html')
      res.write('Not Found Page.')
      res.end()
    }
  }
}
