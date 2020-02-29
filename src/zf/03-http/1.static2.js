/**
 * 访问静态资源 -- 封装
 */

const path = require('path')
const fs = require('fs').promises
const { createReadStream } = require('fs')
const url = require('url')
const http = require('http')

class HttpServer {
  async handlerRequest(req, res) {
    const {
      pathname,
      query
    } = url.parse(req.url, true)
    let filePath = path.join(__dirname, pathname)
    try {
      const statObj = await fs.stat(filePath)
      this.sendFile(statObj, filePath, req, res)
    } catch (error) {
      this.sendError(error, res)
    }
  }

  async sendFile(statObj, filePath, req, res) {
    if (statObj.isDirectory) { // 目录
      filePath = path.join(filePath, 'index.html')
      try {
        await fs.access(filePath)
      } catch (error) {
        this.sendError(error, res)
      }
    } 
    // mime(filePath).getType()
    createReadStream(filePath).pipe(res)
  }

  sendError(e, res) {
    console.log('error', e);
    res.statusCode = 404
    res.end('not found')
  }

  start(...args) { // 开启一个服务
    let server = http.createServer(this.handlerRequest.bind(this))
    server.listen(...args)
  }
}


let server = new HttpServer()

server.start(3000, () => {
  console.log('server is run port 3000');
})

