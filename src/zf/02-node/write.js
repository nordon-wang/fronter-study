 const fs = require('fs')
 const path = require('path')

 const pathT = path.resolve(__dirname, './t.txt')
 const writePath = path.resolve(__dirname, './write.txt')
 const rs = fs.createReadStream(pathT, {
   highWaterMark: 1
 })

 const ws = fs.createWriteStream(writePath, {
   highWaterMark: 3
 })


 rs.on('data', (data) => {
   //  console.log('data', data);
   // 开始写, 性能最好的是，做到收支平衡，读一点写一点
   // flag 代表的是当前我预计的内存(highWaterMark)大小， 是否被放满
   //  const flag = ws.write(data)
   //  console.log('flag', flag);
 })

 rs.on('end', () => {
   console.log('end');
   ws.end() // 写完了
 })


 /** 
  * 做到收支平衡，读一点写一点
  *  结合 drain 进行读一点写一点，提高内存使用
 */
 let index = 0

 function _write() {
   let flag = true
   while (index < 10 && flag) {
     // 限制调用write的次数，当缓存的都写完了之后，再继续
     flag = ws.write(index + '') // 可写流写入的数据只能是string、buffer
     index++
   }

   if(index > 9){
     ws.end() // 写完之后，关闭文件
   }
 }

 _write()
 // 只有当写入的数据个数达到了 highWaterMark 设置的大小，并且写入到文件后清空了，才会触发 drain
 ws.on('drain', () => {
   console.log('drain');
   _write()
 })

 ws.on('close', () => {
   console.log('close');
 }) 