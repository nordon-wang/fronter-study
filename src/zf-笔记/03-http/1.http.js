const http = require('http')
const url = require('url')
const querystring = require('querystring')
let port = 3000

const server = http.createServer()

server.on('request', (req, res) => {
  // http://localhost:3000/user?id=1231#app
  // 1. 请求行
  const METHOD = req.method // GET
  const {
    pathname,
    query
  } = url.parse(req.url, true) // /user?id=1231&name=wy, 不包含后面的#app,不包含hash

  if (pathname === '/favicon.ico') {
    res.end()
    return ''
  }

  // 2. 请求头 -- key会全部小写 eg: User-Agent --> user-agent
  // curl -v -X POST --data a=1,b=2 http://localhost:3000
  console.log('请求头', req.headers);

  // 3. 请求体
  // console.log('请求头', req);
  let arr = []
  req.on('data', (chunk) => { // data方法不一定触发
    arr.push(chunk)
  })

  req.on('end', () => {
    console.log('获取请求体结束', Buffer.concat(arr).toString());
    // 4. 响应行
    res.statusCode = 404
    // 5. 响应头
    // res.setHeader('Content-Length', '1') // 设置了 响应体长度会被截取
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    // 6. 响应体
    const contentType = req.headers['content-type']
    let content = Buffer.concat(arr).toString()

    if (contentType === 'application/json') {
      let obj = JSON.parse(content)
      return res.end(JSON.stringify(obj))
    } else if (contentType === 'application/x-www-form-urlencoded') { // a=1&b=2
      // & 是字段间的分隔符
      // = 是键值对之间的分隔符
      querystring.parse(content, '&', '=')
      return res.end('aa')
    } else {
      return res.end('普通文本')
    }
    // res.write() // 请求不断开
    // res.end(content)
  })


})


server.listen(port, () => {
  console.log(`server run ${port}`);
})



// 如果端口被占用 自动+1
// server.on('error', (error) => {
//   if(error.code === 'EADDRINUSE'){ // 如果端口被占用
//     server.listen(++port) // 会自动触发已有的回调
//   }
// })