/** 
 * 访问静态资源
 */

const path = require('path')
const fs = require('fs')
const url = require('url')
const http = require('http')

const server = http.createServer((req, res) => {
  const {
    pathname
  } = url.parse(req.url)
  let filePath = path.join(__dirname, pathname)

  // 判断文件是否存在 exists access stat
  fs.stat(filePath, (err, statObj) => {
    if (err) {
      res.statusCode = 404
      return res.end('not find')
    }

    if (statObj.isDirectory()) { // 如果是文件夹 需要读取文件夹中的 index.html
      filePath = path.join(filePath, 'index.html')
      fs.access(filePath, (err) => {
        if (err) {
          res.statusCode = 404
          return res.end('not find');
        }
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        fs.createReadStream(filePath).pipe(res)
      })
    } else { // 如果是文件 读取出来直接写回去就可以了
      // 可以根据路径获取到 对应的type
      let type = 'text/html'
      //type =  require('mime').getType(filePath)
      res.setHeader('Content-Type', `${type}; charset=utf-8`)
      fs.createReadStream(filePath).pipe(res)
    }
  })
})


server.listen(3000, () => {
  console.log('server is run port 3000');
})