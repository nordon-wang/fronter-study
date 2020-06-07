
/** 
 * promise 链式调用 
*/
const readFile = () => {
    return new Promise((resolve, reject) => {
        resolve('data')
    })
}

const rd = readFile()

/** 
 * 1. 若是在promise 链式调用中, 返回的是一个普通值, 则接下来的链式调用都是前面一个then 中 return 的值
 * 2. 除了promise和错误都是普通值
*/
// rd
//     .then(data => {
//         console.log('成功===>1', data);
//         return '第一个then的数据, 下一个链式调用的then接收'
//     }, err => {
//         console.log('失败');
//     })
//     .then(data => {
//         console.log('成功===>2', data);
//     }, err => {
//         console.log('失败');
//     })


/** 
 * 1. 链式调用中抛出错误
 * 2. 链式调用中某个地方抛出的错误会被下一个then的err回调函数处理,若是不继续调用,则再下一个链式调用then中, 触发 fulfilled回调
*/
// rd
//     .then(data => {
//         console.log('成功===>1', data);
//         throw new Error('第一个then 抛出的错误')
//     }, err => {
//         console.log('失败===>1');
//     })
//     .then(data => {
//         console.log('成功===>2', data);
//     }, err => {
//         console.log('失败===>2', err);
//         return '第二个then中 返回了正常值'
//     })
//     .then(data => {
//         console.log('成功===>3', data);
//     }, err => {
//         console.log('失败===>3', err);
//     })


/** 
 * 1. 链式调用中, return 的是一个 promise, 那么这个promise会执行,并且会再接下来的链式调用中采用返回的promise状态
*/
rd
    .then(data => {
        console.log('成功===>1', data);
        return new Promise((resolve, reject) => {
            // resolve('第一个then中, return的 promise resolve')
            reject('第一个then中, return的 promise reject')
        })
    }, err => {
        console.log('失败===>1');
    })
    .then(data => {
        console.log('成功===>2', data);
    }, err => {
        console.log('失败===>2', err);
    })