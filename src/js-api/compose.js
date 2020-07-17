
const fn1 = value => {
  return value + ' end'
}

const fn2 = value => {
  return 'start ' + value
}

const fn3 = value => {
  return value + '00'
}

// fn1(fn2(fn3(fn4(args))))
const composeArr = [fn1, fn2, fn3]
const compose = (fns = []) => {
  return function (...args) {
    return fns.reduceRight((res, fn) => {
      return fn(res)
    }, fns.pop()(...args))
  }
}

console.log(compose2(composeArr)('demo'));
