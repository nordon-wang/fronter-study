/** 
 * var && let const
 *  1. var声明默认是挂载在 window上， 只有 window 和 function 作用用
 *     let、const 可以配合 {} 实现一个局部作用域，在全局声明的let、const不会挂载在window上
 *  2. var 声明的变量存在变量提升，function、import都存在
 *     let、const 声明的变量不会变量提升， 暂时性死区
 *  3. var 声明的变量会通过作用域链进行查找，let、const若是在当前作用域声明不会进行向上查找
 *  4. var可以重复声明，后面覆盖前面的，let、const不可以，保证命名不重复
 *  5. var声明都值可以修改，const可以
 *  6. 开发的时候，尽量使用const，如果值需要改变，使用let
*/

//#region 
/* let a = 3
{
  console.log(a);
  let a = 2 // demo3.js:12 Uncaught ReferenceError: Cannot access 'a' before initialization
}
console.log(a); */

/* let a = 1  //Uncaught SyntaxError: Identifier 'a' has already been declared
let a = 2 */
//#endregion

/** 
 * Symbol
*/

//#region 
// const s1 = Symbol('wy')
// const s2 = Symbol('wy')
// console.log(s1 === s2); // false

// const s3 = Symbol.for('wy')
// const s4 = Symbol.for('wy')
// console.log(s3 === s4); // true
// console.log(Symbol.keyFor(s3)); // wy

// const s5 = Symbol()
// const obj = {
//   [s5]: 'symbol s5'
// }
// console.log(obj[s5]);
//#endregion

/** 
 * 元编程
 *  可以改变js源代码的功能 -- 改变js原有的功能
*/

// Symbol.hasInstance
//#region 
// const o = {
//   name: 'wy'
// }

// const obj = {
//   [Symbol.hasInstance]() {
//     return 'name' in o
//   }
// }

// console.log(o instanceof obj);
//#endregion


// Symbol.toPrimitive
//#region 
// const obj = {
//   [Symbol.toPrimitive](primitiveType){
//     console.log(primitiveType); // primitiveType 默认是 default，会根据需要转的类型进行转换类型
    
//     return 1
//   },
//   toString(){
//     return 2
//   },
//   valueOf(){
//     return 3
//   }
// }

// console.log(obj + 2); // primitiveType ---> default
// console.log(obj * 2); // primitiveType --> number
//#endregion


// Symbol.toStringTag
//#region 
const obj = {
  get [Symbol.toStringTag](){ // 加了get 代表是属性， 不是方法
    return '111'
  }
}

console.log(obj.toString()); // [object 111]
//#endregion


/**
 * 模块化
 *  esModule 
 *    静态导入、不可以在作用域中导入
 *    若是需要动态导入，可以在作用域中导入使用，需要借助库实现，动态导入时 import 返回的是一个 promise 对象
 *    导出和使用的是按引用传递的，export 导出的值改变，每次获取的值都是最新值，会跟着变化而变化
 *  commonJs 
 *    导出和使用的是按值传递的，module.exports 导出的值改变，使用的地方不会改变
*/

//#region 
export const a = 1; // 导出的是 a 变量，并不是导出 1
// export default 'nordon' // 导出默认值是可以导出值，而不用导出变量，只能使用一次

const s = 2
const d = 3
const h = 'hi'
export {
  s as s2, // as 别名
  d,
  h as default // 相当于 export default h
}

// 这样是不可以的，因为export 导出的变量，并不是一个对象(值)
// export {
//   f:1,
//   g:1
// }


// 合并、整合导出文件
// export * from './x.js' // 将x.js 中的所有export的变量都导出
// export {a} from './y.js' // 只导出y.js 中所有export 导出的 a，其他的不导出，但是a不能在这个文件中使用

//#endregion


