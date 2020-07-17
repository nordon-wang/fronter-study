/** 
 * 静态文件中间件 -- static
*/
const Koa = require('koa')
const {
  createReadStream
} = require('fs')
const fs = require('fs').promises
const path = require('path')
const mime = require('mime')

const app = new Koa()

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// 静态文件中间件  根据路径，到对应的路径目录下查找，找到返回，找不到继续给下一个中间件找
function static(dirName) {
  return async (ctx, next) => {
    try {
      let filePath = path.join(dirName, ctx.path) // 获取路径
      const statObj = await fs.stat(filePath)
      if (statObj.isDirectory()) { // 目录
        filePath = path.join(filePath, 'index.html')
        await fs.access(filePath)
      }
      
      ctx.set('Content-Type', mime.getType(filePath) + '; charset = utf-8')
      ctx.body = createReadStream(filePath)
    } catch (error) {
      await next()
    }
  }
}

app.use(static(__dirname))
app.use(static(path.resolve(__dirname, './upload')))


app.use(async (ctx, next) => {
  if (ctx.path === '/form' && ctx.method === 'GET') {
    // 若是不自定设置头 会是下载，koa自己做的
    ctx.set('Content-Type', 'text/html; charset=utf-8')
    ctx.body = createReadStream(path.resolve(__dirname, './form.html'))
  } else {
    await next()
  }
})

app.use((ctx) => {
  if (ctx.path === '/login' && ctx.method === 'POST') {

    ctx.body = ctx.request.body
  }
})

app.listen(3000)