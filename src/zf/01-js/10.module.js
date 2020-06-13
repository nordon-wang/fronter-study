// 合并、整合导出文件

// 全部导出
// export { moduleA, moduleB } from './10.modules/x.js'
export * from './10.modules/x.js'
// 只导出 moduleC
export { moduleC } from './10.modules/y.js'
// console.log(moduleC); // moduleC 在这个文件中不能使用

// 副作用导入, 可以让文件执行, 但是不会使用这个文件中导出的变量或者值, 常用于css这类文件的导入
import './10.modules/a';

let a = 1
let b = 2
let d = 'hi'

setInterval(() => {
  a++
}, 1000)

export {
  a as c,
  b,
  // d as default  // 相当于 export default d
}

// export default 导出的是一个值, export 导出的是一个变量(接口 )
export default d

// export const a = 1; // 导出的是 a 变量，并不是导出 1
// // export default 'nordon' // 导出默认值是可以导出值，而不用导出变量，只能使用一次

// const s = 2
// const d = 3
// const h = 'hi'
// export {
//   s as s2, // as 别名
//   d,
//   h as default // 相当于 export default h
// }

// 这样是不可以的，因为export 导出的变量，并不是一个对象(值)
// export {
//   f:1,
//   g:1
// }

