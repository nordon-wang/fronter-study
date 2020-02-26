/** 
 * buffer -- 把二进制表现成10进制 可以合字符串进行转化
*/

// 1. buffer 声明方式，buffer代表的是内存，不可以扩展，声明的时候需要固定大小
//#region 
/* const buf = Buffer.alloc(5)
const bufUnsafe = Buffer.allocUnsafe(5)
const bufArr = Buffer.from([1,2,3])
const bufStr = Buffer.from('wy')
console.log(buf);
console.log(bufUnsafe);
console.log(bufArr);
console.log(bufStr); */
//#endregion

// 2. buffer 常见方法 
//#region 

/* let arr = [[1,2,3],4,5] // 浅拷贝
let newArr = arr.slice(0)
newArr[1] = 44
newArr[0][1] = 22
// console.log(arr); // [ [ 1, 22, 3 ], 4, 5 ]

// buffer 存放的都是内存地址，如果slice截取某一段， 改变的时候也是更改了这个内存地址
let buf = Buffer.from('王耀')
let newBuf = buf.slice(0)
console.log(buf);
newBuf[0] = 65
console.log(buf); */

/* 
let buf = Buffer.from('王耀')
console.log(Buffer.isBuffer(buf)); 
*/

// 

//#endregion

// 3. 扩展buffer方法 split方法
let buf = Buffer.from(`wy
wy
wy`)

Buffer.prototype.split = function (sep) {
  let len = Buffer.from(sep).length // 获取分隔符长度
  let offset = 0
  let result = []
  let current

  // 将找到的位置赋值给 current， 能找到就继续，否则结束
  while ((current = this.indexOf(sep, offset)) !== -1) {
    result.push(this.slice(offset, current)) // 将每次的结果push到数组中
    offset = current + len // 增加查找偏移量
  }
  
  result.push(this.slice(offset)) // 将最后一段push进去
  return result
}

console.log(buf.split('\n'));
