/** 
 * 处理请求相关的
 *  扩展request功能
 */
const url = require('url')

const request = {
  get url() { // 属性访问器，可以处理一些复杂逻辑
    // console.log('request', this); // this === ctx.request
    return this.req.url
  },
  get method() {
    return this.req.method
  },
  get path() {
    return url.parse(this.req.url).pathname
  }
}


module.exports = request