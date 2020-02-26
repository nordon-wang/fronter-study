/** 
 * 文件流 - 文件的读取和操作
 *  readFile writeFile 存在一些问题，会占用大量的内存
 *  可以使用 fs.open 这种 read + write 的方式解决，但是太麻烦，使用流的方式更简单
*/

const fs = require('fs')
const path = require('path')
const PATH_TEST = path.resolve(__dirname, './test.txt')
const ReadStream = require('./read-theory')

// const rs = fs.createReadStream(PATH_TEST, { // 配置在使用中 基本不需要自己配置，使用默认的就可以
const rs = new ReadStream(PATH_TEST, { // 配置在使用中 基本不需要自己配置，使用默认的就可以
  flags: 'r', //当前要做什么操作，与 fs.open 的flags相同，r 读取，w 写入，r+ 在读的基础上可以写，但是文件不存在会报错，w+ 在写的基础上可以读，若是文件不存在则会创建
  encoding: null, // 默认是 buffer
  highWaterMark: 2, // 内部会创建一个 64KB大小的 buffer
  // 读取权限默认是4，写入权限默认是2，执行操作默认是1
  mode: 0o666, // 打开文件读，操作权限是什么，读取、写入、执行权限， 0o777代表最大权限
  autoClose: true,
  start: 0, // 开始位置，包含0
  end: 10 // 结束位置 包含10
})

// 流的默认模式是暂停模式
// 将每次读取的数据保存起来 
let dataArr = []
rs.on('data', (data) => { // 会执行三次，因为 highWaterMark 是5，start到end是11长度，所以执行三次
  console.log(data);
  dataArr.push(data)
})
rs.on('end', () => {
  console.log('fs read end', Buffer.concat(dataArr).toString());
})

rs.on('open', (fd) => {
  console.log('fs open', fd);
})

rs.on('close', () => {
  console.log('fs close');
})

rs.on('error', () => {
  console.log('fs read error');
})

