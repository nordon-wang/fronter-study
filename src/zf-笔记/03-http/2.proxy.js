const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer()


/** 
 * 希望在一个服务上部署多个网站
 * 通过 vim /etc/hosts 增加了两个本地映射路径
 *  127.0.0.1       a.nordon.cn
 *  127.0.0.1       b.nordon.cn
 * 
 * 访问
 *    http://b.nordon.cn:3000/
 *    http://a.nordon.cn:3000/
 * 都可以获取到5000端口返回的数据， 需要启动 a.js b.js
*/

const webMap = {
  'a.nordon.cn': 'http://localhost:5000',
  'b.nordon.cn': 'http://localhost:4000'
}

http.createServer((req, res) => {
  // 根据host不同， 返回不同的网站
  const target = req.headers.host.split(':')[0]

  proxy.web(req, res, {
    target: webMap[target] || webMap['a.nordon.cn']
  })
}).listen(3000)

