const http = require('http')

http.createServer((req, res) => {
  res.setHeader('Content-type', 'text/plain; charset=utf-8')
  res.end('我是AAAAAAAA网站的内容')
}).listen(5000)