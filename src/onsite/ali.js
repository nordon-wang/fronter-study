/** 
 * 阿里口碑一面
 *  总结： 基础知识不够好，原理方面说的不够好，项目说的也不太好
*/

// 1. 建站项目的一些问题，组件化，如何封装编辑页面

// 2. vue原理
// 2.1 渲染
// 2.2 key的作用


// 3.一个div从左移动到右边实现
// transition
// animation
// js操作DOM requestAnimationFrame

// 3.1 三种实现方式对比



// 4.普通函数和箭头函数

let obj = {
  a(){
    return () => {
      console.log(this);
    }
  }
}
obj.a()
let b = obj.a()
b()

let c = obj.a
c()()


// 5. var let const
// 5.1
for (let index = 0; index < 1; index++) {
  let a = 1
}

console.log(a);

// 5.2
console.log(a)
var a = 1
function a() {
}

let a = 1

// 6.BFC、reflow、repaint

// 7.浏览器缓存

