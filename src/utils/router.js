const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const Handlebars = require('handlebars')
const promisify = require('util').promisify
const config = require('../config/getConfig')
const tplPath = path.join(config.root, './src/template/dir.hbs')
const mime = require('../config/mime')
const compress = require('./compress')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())

module.exports = async (req, res, reqPath) => {
  try {
    const status = await stat(reqPath)
    const mimeType = mime(reqPath)
    if (status.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', `${mimeType};charset=utf8;`)
      // 异步读取流文件
      let rs = fs.createReadStream(reqPath)
      // 文件压缩
      if (config.compress(reqPath)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
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
