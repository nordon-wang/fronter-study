
/**
 * 模块化
 *  esModule 
 *    静态导入、不可以在作用域中导入
 *    若是需要动态导入，可以在作用域中导入使用，需要借助库实现，动态导入时 import 返回的是一个 promise 对象
 *    导出和使用的是按引用传递的，export 导出的值改变，每次获取的值都是最新值，会跟着变化而变化
 *  commonJs 
 *    导出和使用的是按值传递的，module.exports 导出的值改变，使用的地方不会改变
*/
// import * as myModules from './10.module.js';
import _, { c, b } from './10.module.js';

setInterval(() => {
  console.log(c, b); // 因为导出的值每一秒++, 所以每次获取的值都会随着接口导出的值改变而变化, commonJS不变,因为其有缓存
}, 1000)



//#region 
// 合并、整合导出文件
// export * from './x.js' // 将x.js 中的所有export的变量都导出
// export {a} from './y.js' // 只导出y.js 中所有export 导出的 a，其他的不导出，但是a不能在这个文件中使用
//#endregion


/** 
 * 动态导入
 *  import语法返回的是一个Promise, data是a.js中 export 或者 export default导出的值或变量
*/
// import('./10.modules/a').then(data => {
//   console.log(data.a);
// })