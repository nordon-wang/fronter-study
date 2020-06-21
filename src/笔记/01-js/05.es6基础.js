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
  get [Symbol.toStringTag]() { // 加了get 代表是属性， 不是方法
    return '111'
  }
}

console.log(obj.toString()); // [object 111]
//#endregion




