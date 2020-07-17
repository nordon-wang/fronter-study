const sum = (a, b, c, d) => {
  return a + b + c + d;
};

const curry = (fn, ...args) => {
  return function (...innerArgs) {
    let finallyArgs = [...args, ...innerArgs]
    
    if(finallyArgs.length >= fn.length) {
      return fn(...finallyArgs)
    }

    return curry(fn, ...finallyArgs)
  };
};

const fn = curry(sum, 1);
console.log(fn(2)(4)(5));


