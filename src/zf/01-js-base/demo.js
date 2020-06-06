
const curry = (fn, arr = []) => {
  return (...args) => {
    arr = arr.concat(args)
    if(arr.length < fn.length){
      return curry(fn, arr)
    }

    return fn(...arr)
  }
}

const fn = (a,s,d,f) => {
  return a + s + d + f 
}

const c = curry(fn)
console.log(c(5)(2,3,1));
