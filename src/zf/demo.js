


const add = (a,b,c,d,e) => {
  return a + b + c + d + e
}

const curring = (fn, arr = []) => {
  const len = fn.length

  return (...args) => {
    arr = arr.concat(args)
    
    if(arr.length < len) {
      return curring(fn, arr)
    }else {
      return fn(...arr)
    }
  }
}


// const b = curring(add)(1)(2,3)(4,5)
// // console.log(b);


const checkType = (content, type) => {
  return Object.prototype.toString.call(content) === `[object ${type}]`
}

const curry = (fn, arr = []) => {
  const len =  fn.length

  return (...args) => {
    arr = arr.concat(args)

    if(arr.length < len){
      return curry(fn, arr)
    }else {
      return fn(...arr)
    }
  } 
} 

// console.log(curry(checkType)('12')('String'));
// console.log(curry(checkType)(123)('String'));
// console.log(curry(checkType)(123)('Number'));


// console.log(checkType('12', 'String'));

// const checkType = (type) => {
//   return (content) => {
//     return Object.prototype.toString.call(content) === `[object ${type}]` 
//   }
// }

// console.log(checkType('String')('123'));


const after = (times, fn) => {
  return () => {
    if(--times === 0){
      fn()
    }
  }
}

const newFn = after(2, () => {
  console.log('after...');
})

newFn()
newFn()
