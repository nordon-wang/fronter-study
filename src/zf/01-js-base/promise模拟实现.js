/** 
 * Promise 是一个类
 * 1. 每次new一个 Promise都需要传递一个执行器，执行器是立即执行的
 * 2. 执行器函数中有两个参数 resolve 、reject
 * 3. Promise默认有三个状态 pending、resolve(fulfilled) 、reject(rejected)
 * 4. 状态确认之后 便不可再改变，只有status为 pending的时候才可以更改状态
 * 5. 每个Promise都有一个 then 方法
 */
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

const isPromise = (value) => {
  if((typeof value === 'object' && value !== null) || typeof value === 'function'){
    return typeof value.then === 'function'
  }

  return false
}

// promise 的处理函数
const resolvePromise = (promise2, x, resolve, reject) => {
  // 处理x的类型 决定调用resolve 还是 reject
  // 自己等待自己
  if (promise2 === x) {
    return reject(new TypeError('TypeError'))
  }

  // 可能是 promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then // 取then方法 
      if (typeof then === 'function') {
        then.call(x, y => {
          // y 可能还是一个 promise
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      reject(error)
    }
  } else { // 不是promise
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this.value = undefined
    this.reason = undefined
    this.status = PENDING
    // 先将then 的回掉都存(订阅)起来，等待真正的 状态改变的时候再依次执行(发布)
    this.onResolvedCbs = []
    this.onRejectedCbs = []

    const resolve = (value) => {
      // 处理 resolve 传递的是 promise，和 resolvePromise 功能相同， reject不会这么等待
      // 如果一个 promise resolve 了一个新的promise， 会等到这个内部的promise执行完毕
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }

      if (this.status === PENDING) {
        this.value = value
        this.status = FULFILLED
        this.onResolvedCbs.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectedCbs.forEach(fn => fn())
      }
    }

    try { // throw 的时候捕获异常
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  // then 方法， 根据不同的状态做不同的事情
  then(onfulfilled, onrejected) {
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
    onrejected = typeof onrejected === 'function' ? onrejected : err => {
      throw err
    }

    // then 方法调用完成之后返回一个新的Promise 确保可以无限调用
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 再当前的上下文中是获取不到 promise2 的，放在定时器中获取，确保可以拿到promise2
        setTimeout(() => {
          try {
            let x = onfulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        });
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onrejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        });
      }

      // 若是 new Promise 的时候，异步更改状态，
      // 需要现将 then中的回调先订阅存储，当真正修改状态当时候再依次执行(发布) then 中的回调
      if (this.status === PENDING) {
        this.onResolvedCbs.push(() => {
          setTimeout(() => {
            try {
              let x = onfulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          });
        })

        this.onRejectedCbs.push(() => {
          setTimeout(() => {
            try {
              let x = onrejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          });
        })
      }
    })

    return promise2
  }

  /** 
   * catch 其实就是 then(null, err => {}) 的简写，没有处理resolve的 then
   */
  catch (errorCb) {
    return this.then(null, errorCb)
  }

  static resolve(value) {
    return new Promise((resolve) => {
      resolve(value)
    })
  }

  static resolve(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      let arr = [] //存放结果
      let i = 0
      let processData = (index, data) => {
        arr[index] = data
        if(++i === promises.length){
          resolve(arr)
        }
      }
  
      for (let index = 0; index < promises.length; index++) {
        const current = array[index];
        if(isPromise(current)){ //是promise
          current.then(data => {
            processData(index, data)
          }, reject)
        } else{ // 不是 promise
          processData(index, current)
        }
        
      }
    })
  }
}


const p = new Promise((resolve, reject) => {
  // const t = setTimeout(() => {
  //   resolve('success')
  //   clearTimeout(t)
  // }, 200);
  resolve('success')
  // reject('错误的')
  // throw new Error('throw 抛出的')
})

p.then((data) => {
  return 1222
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve('第二个 resolve')
  //   }, 800);
  // })
}).then(data => {
  console.log(`data is ${data}`);
}, err => {
  console.log(`err is ${err}`);
})


//#region 
// p.then(data => {
//   console.log(`data is ${data}`);
// }, err => {
//   console.log(`err is ${err}`);
// })

// p.then(data => {
//   console.log(`data is ${data}`);
// }, err => {
//   console.log(`err is ${err}`);
// })
//#endregion

//#region 
// const fs = require('fs')
// const readFile = function (...args) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(...args, (err, data) => {
//       if(err) reject(err);
//       resolve(data)
//     })
//   })
// }
// readFile('ad', 'utf8')
// .then((data) => {
//   return readFile(data, 'urf8')
// })
// .then((data) => {
// }, err => {
// })
//#endregion



function Person() {
  
}

Person.p1 = function () {
  console.log('p1');
}

Person.prototype.p2 = function () {
  console.log('p2');
}

const c = new Person()
console.log(Person);
console.log(c);
Person.p1()



/** 
 * promise问题
*/
//#region 
// 1.中断一个promise， 返回一个pending状态的 promise
const breakOffPromise = new Promise((resolve, reject) => {
  resolve()
})

breakOffPromise.then(() => {
  console.log('执行');
  return new Promise(() => {}) // 返回一个 pending 状态的 promise，就会中断，下一个 then就不执行了
}).then(() => {
  console.log('若是不中断，还是会执行');
})

// 2. finally 实现
// finally 无论成功还是失败都会执行，且可以继续在 finally 之后继续 then
Promise.prototype.finally = function (cb) {
  return this.then(val => {
    // 如果上一个 then 是成功， 就继续传递
    return Promise.resolve(cb()).then(() => val)
  }, err => {
    return Promise.resolve(cb()).then(() => {
      throw err // 如果上一个 then 是失败， 就继续抛出
    })
  })
}


Promise.reject('res').finally(() => {
  console.log('finally...');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('s')
    }, 2000);
  })
}).then(data => {
  console.log(`data is ${data}`);
},err => {
  console.log(`err is ${err}`);
})

/** 
 * 3. promise 优缺点
 *  优点
 *    解决异步并发问题 promise.all
 *    链式调用、解决回调地狱
 *  缺点
 *    还是基于回调的
 *    promise无法终止
*/


// 4. Promise.race 实现
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let index = 0; index < promises.length; index++) {
      promises[i].then(resolve, reject)
    }
  })
}

//#endregion


