const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const config = require('../config/getConfig')
const tplPath = path.join(config.root, './src/template/dir.hbs')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())

module.exports = async (req, res, reqPath) => {
  try {
    const status = await stat(reqPath)
    if (status.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain;charset=utf8;')
      // 异步读取流文件
      fs.createReadStream(reqPath).pipe(res)
    } else if (status.isDirectory()) {
      const files = await readdir(reqPath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html;charset=utf8;')
      const root = path.relative(config.root, reqPath)
      const html = template({
        files,
        title: path.basename(reqPath),
        root: root === '' ? '' : `/${root}`
      })
      res.end(html)
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
