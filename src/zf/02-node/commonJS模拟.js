
// const a = require('./a')
const fs = require('fs')
const path = require('path')
const vm = require('vm')

function Module(absPath) {
  this.id = absPath
  this.exports ={}
}

const wrap = [
  '(function (exports, module, require) {',
  // 这里放的就是加载模块里面的js代码
  '})'
]

Module.prototype.load = function () {
  // 1. 读取需要加载的模块中的js代码
  const script = fs.readFileSync(this.id, 'utf8')
  // 2. 将模块里面的代码和 wrap结合， 形成一个函数
  const fnStr = wrap[0] + script + wrap[1]
  // 3. 利用 vm 提供的沙箱机制，
  const fn = vm.runInThisContext(fnStr)
  // 4. 执行拼接之后的函数
  fn(this.exports, this, req)
}

const req = function (file) {
  // 1. 获取绝对路径
  const absPath = path.resolve(__dirname, file)
  // 2. 创建一个模块 模块需要有一个 exports 属性
  const module = new Module(absPath)
  // 3. 加载模块
  module.load()
  // 4. 执行完load之后， module上的 exports 会被赋值， 将其返回
  return module.exports
}

const r = req('./a.js')
console.log(r);

