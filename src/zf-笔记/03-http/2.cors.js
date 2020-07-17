/** 
 * 跨域
 *  cors 就死res.setHeader 的设置
 * 代理
 *  正向代理
 *    服务器不知道代理的存在，代理机器对于服务端是透明的，代理机器是属于客户端这边的的，服务端也不知道是谁访问
 *    主要做 认证、权限校验
 *  反向代理
 *    客户端不知道代理机器的存在，代理机器对于客户端是透明的，代理机器是属于服务端这边的，客户端也不知道真正访问的是哪个
 *    客户端访问网站，网站做了分布式集群，怎么分配是服务端这边的事，不需要客户端操心，也感觉不到
 *    主要做 分布式集群， webpack - proxy， CDN(缓存+反向代理)
*/
const http = require('http')

http.createServer((req, res) => {
  // 解决跨域
  // res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  // 允许设置cookie
  res.setHeader('Access-Control-Allow-Credentials', true)
  // 设置 Cookie
  res.setHeader('Set-Cookie', 'name=nordon')
  // 允许哪些自定义header
  res.setHeader('Access-Control-Allow-Headers', 'token, c')
  // 允许哪些方法
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, PUT')
  // 30分支发一次预请求 options
  res.setHeader('Access-Control-Max-Age', '1800') 
  // options 与请求
  if(req.method === 'OPTIONS'){
    return res.end()
  }

  console.log('请求成功 ');
  if(req.url === '/api'){
    res.end(JSON.stringify({
      name: 'wy',
      age: 18
    }))
  }
}).listen(3000)
