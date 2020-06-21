
/** 
 * 真正实战中使用
*/
const fs = require('fs')
const  path = require('path')

const rPath = path.resolve(__dirname, './t.txt')
const wPath = path.resolve(__dirname, './t2.txt')

const rs = fs.createReadStream(rPath, {
  highWaterMark: 4
})

const ws = fs.createWriteStream(wPath, {
  highWaterMark: 2
})

rs.pipe(ws) // 默认会调用可写流的 write 和 end 方法

//#region  下面代码 === rs.pipe(ws)
// rs.on('data', (chunk) => {
//   // const flag = ws.write(chunk) 
//   console.log('flag', flag);
//   if(!flag){
//     rs.pause() // 若是 ws的缓存已经放满了，需要将读取文件的操作暂停
//   }
// })

// ws.on('drain', () => { // 每次的写入流 ws 将缓存中的数据写完了之后呢，就恢复继续读取文件
//   console.log('drain');
//   rs.resume()
// })
//#endregion

