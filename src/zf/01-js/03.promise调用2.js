// const Promise = require('./03.promise')

/**
 * promise 优缺点
 *  优点
 *      解决并发问题 promise.all
 *      链式调用
 *  缺点
 *      还是基于回调的
 *      promise 无法终止, 只能抛弃这次结果
*/

// const p = new Promise((resolve, reject) => {
//     // console.log('a',a );
//     // resolve(1)
//     resolve('success')
//     // setTimeout(() => {
//     // }, 600);
// });


// p
//     .then((value) => {
//         console.log('成功===>', value);
//     }, (err) => {
//         console.log('失败===>', err);
//     })
//     .then((value) => {
//         console.log('成功===>2', value);
//     }, (err) => {
//         console.log('失败===>2', err);
//     })


/** 
* 循环调用
    TypeError: Chaining cycle detected for promise #<Promise>

*/
// const p2 = p.then(data => {
//     return p2
// })

// p2.then(data => {
//     console.log(data);
// }, err => {
//     console.log(err);
// })


/** 
 * 需要递归处理
*/
// const promise1 = new Promise((resolve, reject) => {
//     resolve('初始化')
// })

// promise1
//     .then(data => {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(new Promise((resolve, reject) => {
//                     resolve('成功了')
//                 }))
//             })
//         }, err => {
//             console.log('err: ', err);
//         })
//     })
//     .then(data => {
//         console.log('成功', data);
//     }, err => {
//         console.log('失败', err)
//     })

/** 
 * 如果一个promise resolve 一个新的 promise, 会等到这个新的promise执行完成
*/
// const p2 = new Promise((resolve, reject) => {
//     resolve(new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('成功')
//         }, 500);
//     }))
// })
// p2.then(data => {
//     console.log('成功', data);
// }, err => {
//     console.log('失败', err)
// })


/** 
 * catch
*/
// const Promise = require('./03.promise')
// const p3 = new Promise((resolve, reject) => {
//     // resolve(new Promise((resolve, reject) => {
//     //     setTimeout(() => {
//     //         reject('失败信息')
//     //     }, 500);
//     // }))
//     reject('失败信息')
// })
//     .then(data => {
//         console.log('成功111');
//     }, err => {
//         console.log('err1111');
//         throw err;
//     })
//     .catch(err => {
//         console.log('捕获异常', err);
//     })



/** 
 * all
*/
// const Promise = require('./03.promise')

// const all1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('all1')
//     }, 500);
// })

// const all2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('all2')
//     }, 800);
// })
// const all3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('all3')
//     }, 1000);
// })

// Promise.all([all1, 222, all2, all3, 55]).then(data => {
//     console.log('成功', data);
// }, err => {
//     console.log('err: ', err);
// })


/**
 * 中断 promise 链
 *  在当前的promise then中, 返回一个 pending 状态的 promise, 既不成功 也不失败, 就会起到中断的效果
 */
// const p = new Promise((resolve, reject) => {
//     resolve('成功')
// })

// p
// .then(data => {
//     console.log(data);
//     return new Promise(() => {})
// })
// .then(data => {
//     console.log(data);
// })



/**
 * finally
 *  不论成功还是失败都会执行
*/
// const Promise = require('./03.promise')
// Promise.resolve('data').then(data => {
//     console.log(data);
// }).finally(() => {
//     console.log('finally');
// })

// Promise.reject('data').then(data => {
//     console.log(data);
// }).finally(() => {
//     console.log('finally');
// }).catch(err => {
//     console.log(err);
// })

// finally 若是返回一个 promise, 会等待这个promise 执行完毕再继续向下走
// Promise.resolve('data').finally(() => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('finally data')
//         }, 1500);
//     })
// })
// .then(data => {
//     console.log('data', data);
// }, err => {
//     console.log('err', err);
// })


/** 
 * race
*/
const Promise = require('./03.promise')
const all1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('all1')
    }, 500);
})

const all2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('all2')
    }, 200);
})
const all3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('all3')
    }, 1000);
})

Promise.race([all1, all2, all3]).then(data => {
    console.log('成功', data);
}, err => {
    console.log('err: ', err);
})
