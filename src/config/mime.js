const path = require('path')

const mimeType = {
  'xml': 'application/xml',
  'pdf': 'application/pdf',
  'zip': 'application/zip',
  'json': 'application/json',
  'js': 'application/javascript',
  'css': 'text/css',
  'htm': 'text/html',
  'html': 'text/html',
  'txt': 'text/plain',
  'tif': 'image/tiff',
  'tiff': 'image/tiff',
  'gif': 'image/gif',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'webp': 'image/webp',
  'ico': 'image/x-icon',
  'svg': 'image/svg+xml'
}

module.exports = (filePath) => {
  let extName = path.extname(filePath).split('.').pop().toLowerCase()
  return !mimeType[extName] ? 'text/plain' : mimeType[extName]
}
