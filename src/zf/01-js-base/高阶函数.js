/** 
 * 1.高阶函数
 *  一个函数的参数是一个函数 -- 回调
 *  一个函数 返回一个函数 -- 拆分函数
 */

/** 
 * 函数的before
 *  将核心逻辑提取出来，在外面增加功能
 */
//#region 
Function.prototype.before = function (fn) {
  return () => {
    fn()
    this() // 因为使用箭头函数，这里的this指向 say
  }
}

const say = () => {
  console.log('say...');
}

const sayBefore = say.before(() => {
  console.log('say before ....');
})

// sayBefore()
//#endregion

/** 
 * 2.事务
 *  开始的时候做某件事，结束的时候再做某件事
 */
//#region 
// 期望再say之前和之后都做一些事情
const perform = (fn, wrapperList) => {
  // 1. 先将所有初始化的方法执行一遍
  wrapperList.forEach(wrap => {
    wrap.initilizae()
  })

  // 2. 执行核心方法
  fn()

  // 3. 最后将所有的结束方法执行一遍
  wrapperList.forEach(wrap => {
    wrap.close()
  })

}

/* perform(() => {
  console.log('say');
}, [{ //数组中的每一个对象相当于一个 wrapper
    initilizae() {
      console.log('wrapper1 before....');
    },
    close() {
      console.log('wrapper1 after...');
    }
  },
  { //数组中的每一个对象相当于一个 wrapper
    initilizae() {
      console.log('wrapper2 before....');
    },
    close() {
      console.log('wrapper2 after...');
    }
  }
]) */
//#endregion


/** 
 * 3. 柯里化
 */
// 3.1
const checkType = (type) => {
  // return Object.prototype.toString.call(content).slice(8, -1) === type
  return (content) => {
    return Object.prototype.toString.call(content).slice(8, -1) === type
  }
}
const isString = checkType('String')

// console.log(checkType(1, 'Number'));
// console.log(checkType('1', 'Number'));
// console.log(isString(2));
// console.log(isString('2'));


// 3.2
const add = (a, s, d, f, g) => {
  return a + s + d + f + g
}

const curring = (fn, arr = []) => {
  let len = fn.length
  return (...args) => {
    arr = [...arr, ...args]
    if (arr.length < len) {
      return curring(fn, arr)
    }

    return fn(...arr)
  }
}

// console.log(curring(add)(1,2)(3)(4,5));

const checkType2 = (type, content) => {
  return Object.prototype.toString.call(content).slice(8, -1) === type
}
// console.log(curring(checkType2)('Number')(2));
// console.log(curring(checkType2)('String')('2'));
// console.log(curring(checkType2)('String')(2));

/** 
 * 4. after
 *  调用函数多少次之后执行回掉
 */
const after = (times, fn) => {
  return () => {
    if (--times === 0) {
      fn()
    }
  }
}

const newAfter = after(2, () => {
  console.log('after action...');
})

// newAfter()
// newAfter()


/** 
 * 5. compose
 */

function concat(a, b) {
  return a + b
}

function len(str) {
  return str.length
}

function addCurrency(number) {
  return `$ ${number}`
}

/* function compose(...args) {
  return function (...args2) {
    const fn = args.pop()

    return args.reduceRight((res, current) => {
      return current(res)
    }, fn(...args2))
  }
} */

/* const compose = (...args) => (...args2) => {
  const fn = args.pop()
  return args.reduceRight((res, current) => current(res), fn(...args2))
} */


/* const compose = (...fns) => {
  return fns.reduce((prev, current) => {
    return function (...args) {
      return prev(current(...args))
    }
  })
} */

const compose = (...fns) => fns.reduce((a,b) => (...args) => a(b(...args)))

const composeRes = compose(addCurrency, len, concat)('asd', 'qwe')
console.log('composeRes', composeRes);
