/** 
 * 可读流 原理
 */
const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')

class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    // 默认参数
    this.path = path
    this.flags = options.flags || 'r'
    this.encoding = options.encoding || null
    this.highWaterMark = options.highWaterMark || 64 * 1024
    this.mode = options.mode || 438
    this.autoClose = options.autoClose || true
    this.start = options.start || 0
    this.end = options.end
    this.flowing = null // 默认是暂停模式
    this.offset = 0 // 偏移量

    this.open() // 当创建可读流时，打开文件成功
    this.on('newListener', (type) => { // 每次实例绑定新的方法 都可以监听到
      if (type === 'data') {
        this.flowing = true
        this.read()
      }
    })
  }

  read() { // 读取文件
    // 因为open是异步执行的，在执行read的时候，fd还不存在
    // 若是fd不存在，绑定一个once的事件，当open完成的时候会 emit open， 此时再重新执行read，保证fd存在
    // fd 存在必定是 number 类型
    if (typeof this.fd !== 'number') {
      return this.once('open', this.read)
    }

    // 开始 read
    // 每次读取2个 把buffer填满
    // 计算每次应该读取几个
    // 共读取 this.end - this.start + 1 
    let readAmount = this.end ?
      Math.min(this.highWaterMark, this.end - this.start + 1 - this.offset) :
      this.highWaterMark
    let buffer = Buffer.alloc(readAmount)
    fs.read(this.fd, buffer, 0, readAmount, this.offset, (err, bytesRead) => {
      this.offset += bytesRead

      if (bytesRead > 0 ) { // 每次读到数据 继续读
        this.emit('data', buffer) // 读取到内容 emit data
        this.flowing && this.read()
      } else { // 读完来 emit end
        this.emit('end')
        this.close()
      }
    })
  }

  close() {
    if (this.autoClose) {
      fs.close(this.fd, () => {
        this.emit('close')
      })
    }
  }

  open() { //打开文件 异步执行
    fs.open(this.path, this.flags, (err, fd) => {
      this.fd = fd
      this.emit('open', fd)
    })
  }

  // 暂停
  pause() {
    this.flowing = false
  }

  // 恢复
  resume() {
    this.flowing = true
    this.read()
  }
}

module.exports = ReadStream