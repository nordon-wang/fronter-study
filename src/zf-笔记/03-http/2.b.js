const http = require('http')

http.createServer((req, res) => {
  res.setHeader('Content-type', 'text/plain; charset=utf-8')
  res.end('我是BBBBBBBB网站的内容')
}).listen(4000)