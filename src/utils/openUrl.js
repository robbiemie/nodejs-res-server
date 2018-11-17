const { exec } = require('child_process')
/**
 * nodejs识别不同平台
  'aix'
  'darwin'
  'freebsd'
  'linux'
  'openbsd'
  'sunos'
  'win32'
 */
module.exports = url => {
  console.log(url, process.platform)
  switch (process.platform) {
    case 'darwin': // for mac
      exec(`open ${url}`)
      break
    case 'win32': // for windows
      exec(`start ${url}`)
      break
  }
}
