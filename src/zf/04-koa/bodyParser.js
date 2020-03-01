
/** 
 * 模拟实现 bodyParser
*/
const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')

const app = new Koa()

// 模拟实现 bodyParser
// const bodyParser = require('koa-bodyparser')

// 在buffer上增加 split 方法
Buffer.prototype.split = function (sep) {
  const len = Buffer.from(sep).length // 分隔符长度
  let offset = 0 // 偏移量
  let result = []
  let current

  // 把找到的位置赋给 current， 看一下是否为-1
  while ((current = this.indexOf(sep, offset)) !== -1) {
    result.push(this.slice(offset, current)) // 把每次找到的 放到数组中
    offset = current + len
  }
  result.push(this.slice(offset)) // 最后一段追加进去
  return result
}

function bodyParser(...args) {
  // 返回的才是 use 需要的
  return async (ctx, next) => {
    // 会等着这个执行完毕 才会继续走 next
    await new Promise((resolve, reject) => {
      let arr = []
      ctx.req.on('data', data => {
        arr.push(data)
      })
      ctx.req.on('end', () => {
        // 如果当前提交过来的数据不是正常的 json、表单格式，比如有上传文件时，就需要自己解析
        // multipart/form-data; boundary=----WebKitFormBoundaryOlVtrG3meosag132
        const contentType = ctx.get('content-type')
        if (contentType.includes('multipart/form-data')) {
          const buff = Buffer.concat(arr)
          let boundary = contentType.split('=')[1]
          boundary = '--' + boundary
          let lines = buff.split(boundary).slice(1, -1)
          let obj = {}
          lines.forEach(line => {
            let [header, content] = line.split('\r\n\r\n')
            header = header.toString()
            // console.log('header', header);
            let key = header.match(/name="(.+?)"/)[1]
            if(header.includes('filename')){ // 是图片、文本等资源
              let fileName = uuid.v4() 
              fs.writeFileSync(path.resolve(__dirname, `./upload/${fileName}`), content.slice(0, -2), 'utf8')
              obj[key] = fileName
            }else { // 普通数据
              obj[key] = content.slice(0,-2).toString()
            }
          })
          console.log('obj', obj);

          // console.log('boundary', boundary)
          ctx.request.body = obj
          resolve()
        }else {
          resolve()
        }

      })
    })
    await next()
  }
}
app.use(bodyParser())

app.use(async (ctx, next) => {
  if (ctx.path === '/form' && ctx.method === 'GET') {
    // 若是不自定设置头 会是下载，koa自己做的
    ctx.set('Content-Type', 'text/html; charset=utf-8')
    ctx.body = fs.createReadStream(path.resolve(__dirname, './form.html'))
  } else {
    await next()
  }
})

app.use((ctx) => {
  if (ctx.path === '/login' && ctx.method === 'POST') {

    ctx.body = ctx.request.body

    // 若是不 return 一个 promise，会导致获取不到
    // return new Promise((resolve, reject) => {
    //   let arr = []
    //   ctx.req.on('data', data => {
    //     arr.push(data)
    //   })
    //   ctx.req.on('end', () => {
    //     ctx.body = Buffer.concat(arr).toString()
    //     resolve()
    //   })
    // })
  }
})

app.listen(3000)