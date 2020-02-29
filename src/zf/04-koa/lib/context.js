/** 
 * 整合上下文 -- 主要是代理
 * ctx 需要整合 req， res
 * 封装request 和 response 对象，然后将其放到 ctx
 */

const context = {}


// getter
function defineGetter(property, key) {
  context.__defineGetter__(key, function () {
    // this === context， 这个context不是本模块内的这个，是外部 Object.create 创建的这个
    return  this[property][key]
  })
}

// setter
function defineSetter(property, key) {
    context.__defineSetter__(key, function (newVal) {
      this[property][key] = newVal
    })
}

defineGetter('request', 'url')
defineGetter('request', 'method')
defineGetter('request', 'path')

defineGetter('response', 'body')
defineSetter('response', 'body')

// 实现代理功能
// context.__defineGetter__ === Object.defineProperty
// context.__defineGetter__('url', function () {
//   // this === context， 这个context不是本模块内的这个，是外部 Object.create 创建的这个
//   return  this.request.url
// })

module.exports = context