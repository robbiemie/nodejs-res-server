const { createDeflate, createGzip } = require('zlib')
/**
 * compress
 * @param rs type: ReadStream
 */
module.exports = (rs, req, res) => {
  const accept = req.headers['accept-encoding']
  const reg = /\b(gzip|deflate)\b/
  if (!accept || !accept.match(reg)) {
    return rs
  } else if (accept.match(/\bgzip\b/)) {
    res.setHeader('content-encoding', 'gzip')
    return rs.pipe(createGzip())
  } else {
    res.setHeader('content-encoding', 'deflate')
    return rs.pipe(createDeflate())
  }
}
