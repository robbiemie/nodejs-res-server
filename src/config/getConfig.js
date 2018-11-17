module.exports = {
  hostname: 'test.yy.com',
  port: 4000,
  root: process.cwd(),
  compress: (filePath) => {
    return /\.(js|css|html|json|md)$/.test(filePath)
  }
}
