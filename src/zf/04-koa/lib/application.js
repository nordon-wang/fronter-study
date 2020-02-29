/** 
 * koa 核心文件
 */
const http = require('http')

const context = require('./context')
const request = require('./request')
const response = require('./response')


class Application {
  constructor() {
    // 使用 Object.create 可以避免破坏原有对象，方便后续扩展
    this.context = context
    this.request = request
    this.response = response
    this.middlewares = []
  }

  use(fn) { // 注册方法
    // this.fn = fn
    this.middlewares.push(fn)
  }

  compose(ctx) {
    const dispatch = (index) => {
      if(index === this.middlewares.length) {
        return Promise.resolve()
      }

      const middle = this.middlewares[index]
      // 拿出第一个中间件，让其执行
      // 传递ctx 和 next
      // next 可能不是promise， 使用 Promise.resolve() 保证是 promise
      return Promise.resolve(middle(ctx, () => dispatch(index + 1)))
    }

    return dispatch(0)
  }

  handleRequest(req, res) { // 处理请求
    const ctx = this.createContext(req, res)
    // this.fn(ctx)
    this.compose(ctx).then(() => {
      const _body = ctx.body
      res.end(_body)
    })
  }

  createContext(req, res) { // 创建上下文对象 ctx
    // 将数据整合
    const context = Object.create(this.context)

    // request
    context.request = Object.create(this.request)
    // 必须要把req 放到 context.request.req, 这样才能在 request模块中的属性访问器拿到 req
    context.req = context.request.req = req

    // response
    context.response = Object.create(this.response)
    context.res = context.response.res = res

    return context
  }

  listen(...args) { // 监听端口号
    const server = http.createServer(this.handleRequest.bind(this))

    server.listen(...args)
  }
}



module.exports = Application