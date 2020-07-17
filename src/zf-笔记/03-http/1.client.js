/** 
 * 类似 bff
 */
const http = require('http')

// request 发送请求体
const config = {
  port: 3000,
  hostname: 'localhost',
  method: 'POST',
  headers: {
    a: 1,
    'Content-Type': 'application/json'
  }
}

const client = http.request(config, (res) => { // 请求后 会将响应的结果放在回调res中
  let arr = []
  res.on('data', chunk => {
    arr.push(chunk)
    console.log('chunk', chunk);
  })

  res.on('end', () => {
    console.log('arr', Buffer.concat(arr).toString());
  })
})

// client.write()
/** 
 * 数据传输 常见格式
 *  json {a:1}
 *  form 数据 a=1&b=2
 *  文件格式
*/
const params = {
  name: 'w',
  age: 12
}

client.end(JSON.stringify(params))



// get -- 只能发送get请求，一般不使用，基本使用request
// http.get('http://localhost:3000', () => {
//   console.log('请求发送成功');
// })