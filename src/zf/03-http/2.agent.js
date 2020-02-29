/** 
 * 根据内核跳转页面
 *  301 永久重定向
 *  302 临时重定向
 */

const http = require('http')

http.createServer((req, res) => {
  const userAgent = req.headers['user-agent']
  console.log('userAgent', userAgent.includes('Mobile'));
  if (userAgent.includes('Mobile')) {
    // Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Mobile Safari/537.36
    res.statusCode = 302
    // 如果是移动端 跳转到百度 https://www.baidu.com/
    res.setHeader('Location', 'https://www.baidu.com/')
    res.end()
  }else {
    // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36
    // 如果是pc 跳转到 https://cn.bing.com/
    res.statusCode = 302
    // 如果是移动端 跳转到百度 https://www.baidu.com/
    res.setHeader('Location', 'https://cn.bing.com/')
    res.end()
  }



  res.end('ad')
}).listen(3000)