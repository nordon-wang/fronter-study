/** 
 * generator && async await
*/

/** 
 * 迭代器 iterator
*/

/** 
 * 1. 将类数组转为数组
 *  由于类数组具有 iterator , 可以直接转换为数组
*/
function iterator1() {
  console.log([...arguments]);
}

// iterator1()

/** 
 * 2. 如何将对象转为数组
*/
function iterator2() {
  console.log([...{
    0: 1,
    1: 2,
    length: 2,
    [Symbol.iterator]() {
      // 迭代器: 具有next方法, 而且方法执行后, 需要返回一个对象,这个对象需要包含 value 和 done,
      // next会一直执行, 知道 done 为 true结束
      const len = this.length
      let index = 0

      return {
        next: () => {
          return {
            value: this[index++],
            done: index === len + 1
          }
        }
      }
    }
  }]);
}
// iterator2()


function iterator3() {
  console.log([...{
    0: 1,
    1: 2,
    length: 2,
    [Symbol.iterator]: function* () {
      let index = 0
      while (index !== this.length) {
        yield this[index++]
      }
    }
  }]);
}
// iterator3()


function* getName(arg) {
  console.log('开始');
  let a = /* 1 */ yield arg
  console.log('a--->', a);
  let b = /* 2 */ yield '2222'
  console.log('b--->', b);
}

// let it = getName('第1次')
// console.log(it.next('第2次')); // { value: '', done: false }
// console.log(it.next('第3次'));
// console.log(it.next('第4次'));


/** 
 * 常规使用
*/

const all1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('all1')
  }, 500);
})

const all2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('all2')
  }, 800);
})

function* getAll() {
  const a1 = yield all1
  const a2 = yield all2
  return a2
}

// const all = getAll()
// all.next().value.then(data1 => {
//   console.log('data1:', data1);
//   all.next().value.then(data2 => {
//     console.log('data2:', data2);
//   })
// })


/** 
 * CO-JS 模拟
*/
function co(it) {
  return new Promise((resolve, reject) => {
    // 异步递归, 需要提供一个next方法
    function  next(data) {
      const {
        value,
        done
      } = it.next(data)

      if (!done) {
        Promise.resolve(value).then(data => {
          next(data)
        }, err => {
          reject(err)
        })
      } else {
        resolve(value)
      }
    }

    next()
  })
}

co(getAll()).then(data => {
  console.log(data);
})