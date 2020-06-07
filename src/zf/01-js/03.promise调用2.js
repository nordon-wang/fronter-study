const Promise = require('./03.promise')

const p = new Promise((resolve, reject) => {
    // console.log('a',a );
    // resolve(1)
    resolve('success')
    // setTimeout(() => {
    // }, 600);
});


p
    .then((value) => {
        console.log('成功===>', value);
    }, (err) => {
        console.log('失败===>', err);
    })
    .then((value) => {
        console.log('成功===>2', value);
    }, (err) => {
        console.log('失败===>2', err);
    })


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