/** 
 * 浏览器中打印 1 2
 * node中打印 2 1
*/

function fn() {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

async function g() {
  // await 在浏览器和node中编译结果的处理是不一样，导致打印顺序不一样
  // await fn()
  // console.log('1');

  // 浏览器中
  // Promise.resolve(fn()).then(() => {
  //   console.log('1');
  // })

  // node 中
  // new Promise((resolve, reject) => resolve(fn())).then(() => {
  //   console.log('1');
  // })
}

g()

Promise.resolve().then(() => {
  console.log('2');
})

