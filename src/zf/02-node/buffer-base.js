const fs = require('fs')
const path = require('path')


/** 
 * 默认文件读取操作，读取出来的都是buffer
 * 内存表示方式就是 buffer
*/
// const f = fs.readFileSync(path.resolve(__dirname, './a.js'))
// console.log(f.toString()); //

/** 
 * 十进制 转 二进制 -- 小数 * 2 取整法
 * 0.5 --> 0.1
 *  0.5 * 2 = 1
 * 
 * 0.4 --> 
 *  0.4 * 2 = 0.8 --> 0
 *  0.8 * 2 = 1.6 --> 1
 *  0.6 * 2 = 1.2 --> 1
 *  0.2 * 2 = 0.4 --> 0
*/

/** 
 * 整数 进制转换 基于编码
 *  ASCII码 默认就是一个字节来表示是一个字母或者符号
 *  一个字节，有8个bit 最大是 8个1 ===> 255
 * 
 * GB2312 --> GB18030 --> gbk 用两个字节表示中文
 * unicode --> utf8 用三个字节表示中午
 *  node默认支持 utf8
*/

/** 
 * 十进制整数转换为二进制整数采用"除2取余，逆序排列"法。
 * 具体做法是：用2整除十进制整数，可以得到一个商和余数；
 * 再用2去除商，又会得到一个商和余数，如此进行，直到商为0时为止，然后把先得到的余数作为二进制数的低位有效位，后得到的余数作为二进制数的高位有效位，依次排列起来
 * 5 --> 101
 *  2 1
 *  1 0
 *  0 1
 * 
 * 7 --> 111
 * 3 1
 * 1 1
 * 0 1
 * 
 * 11 --> 1011 
 * 5 1
 * 2 1
 * 1 0
 * 0 1
*/



/** 
 * base64 二进制等值不能超过64 核心就是进制的转化，可以反解
 * base64 转换之后的结果 会比原来的内容大 1/3左右
*/

// 1.获取一个 汉字的 buffer 是一个用三个字节表示的 十六进制的
console.log(Buffer.from('耀')); // <Buffer e8 80 80>

// 2.将转换的16进制 转换为二进制
// 0x 16进制
// 0b 2进制
// 0o 8进制
console.log(0xe8.toString(2)); // 11101000
console.log(0x80.toString(2)); // 10000000
console.log(0x80.toString(2)); // 10000000

// 3. 将三个字节转换的二进制进行处理，因为base64 不能超过64，所以那个base64只有6位bit
// 将二进制的结果 转换成 base64 -->  3 * 8 = 6 * 4
// 11101000 10000000 10000000
// 111010 001000 000010 000000

// 4. base64 转化后去特定的字符串取值, 得到base64转化的结果
const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const res = str[0b111010] + str[0b001000] + str[0b000010] + str[0b000000]
console.log('res: ', res); // 6ICA
console.log('buffer 直接转 base64: ',Buffer.from('耀').toString('base64'));


