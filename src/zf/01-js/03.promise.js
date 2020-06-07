/** 
 * 为啥子要有 promise
 *  1. 解决并发问题, 同步多个异步方法的执行结果
 *  2. 链式调用问题, 解决多个回调嵌套的问题
*/

/** 
 * 什么是promise
 *  promise 是一个类
 *  1. 每次 new 一个 promise 都需要传递一个执行器,执行器是立即执行的
 *  2. 执行器函数中有两个参数 resolve 和 reject
 *  3. promise 有三个状态, pending, fulfilled 和 rejected
 *  4. 状态不可逆, fulfilled 或者 rejected 之后状态不可变
 *  5. 每个promise都有一个then方法
*/
console.log('===== Promise ====');

// 状态
const PENDING = 'pendging'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// promise 统一处理函数
const resolvePromise = (promise2, x, resolve, reject) => {
  // 根据 x 的类型, 决定是调用 resolve 还是 reject

  // 自己等自己, 循环引用了
  if (promise2 === x) {
    return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }

  // 若 x 是一个对象或者函数, 暂认为是promise
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 根据 then 判断是不是 promise
    // 获取 then的时候, 可能会报错
    /* Object.defineProperty(x, 'then', {
      get() {
        throw new Error('error')
      }
    }) */
    let called = false // 默认没有调用成功 和 失败
    try {
      const then = x.then
      if (typeof then === 'function') { // 是promise
        /** 
         * 为何不直接使用 x.then()
         *  可能会再次触发then函数的get, 若不能确保其是纯函数,则可能出现问题
         *  若是使用x.then()调用,则每次调用的时候不能确保结果是一致的,
         * let i = 0 
         * Object.defineProperty(x, 'then', {
              get() {
                i++
                if(i > 2) {
                  throw new Error('error')
                }
              }
            })
          这样多次调用x.then的时候,便会出问题
        */
        // x.then(() => {}, () => {})
        then.call(x, y => {
          // y 可能还是一个promise, 递归解析
          // resolve中可能还会放一个 promise

          // resolve(y)
          if (called) return // 防止多次调用
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if (called) return // 防止多次调用
          called = true
          reject(r)
        })
      } else { // 常量直接抛出去
        resolve(x)
      }
    } catch (e) {
      if (called) return // 防止多次调用
      called = true
      reject(e)
    }
  } else { // 不是promise, 是一个普通值
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this.value = undefined // resolve值
    this.reason = undefined // reject值
    this.status = PENDING
    this.onResolvedCbs = []
    this.onRejectedCbs = []

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.onResolvedCbs.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCbs.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    // 函数处理
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

    // then 方法调用后, 会继续返回一个新的promise, 保证可以无限链式调用
    const promise2 = new Promise((resolve, reject) => {
      // 在返回的 promise 中, 取到上一次的状态, 并根据这个状态决定 promise2 是 resolve 还是 reject 
      if (this.status === FULFILLED) {
        // 当前的 onFulfilled, onRejected 不能在当前上下文中执行,为了确保 promise2 存在
        // 此时的promise2 还没有初始化赋值完成,是获取不到的
        // 将代码放到异步中,可以获取的到
        setTimeout(() => {
          try {
            // 将then中的方法执行,并且将其结果传递至下一个then中
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onResolvedCbs.push(() => {
          try {
            setTimeout(() => {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            }, 0);
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedCbs.push(() => {
          try {
            setTimeout(() => {
              const x = onFulfilled(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            }, 0);
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return promise2
  }
}

// 根据promise A+ 规范测试
// https://github.com/promises-aplus/promises-tests
// 1. 安装  npm i -g promises-aplus-tests

// 2. 编写
Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })

  return dfd
}

// 3. 运行 npx promises-aplus-tests 03.promise.js

module.exports = Promise;