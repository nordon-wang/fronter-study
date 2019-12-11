/**
 * 通过枚举和递归实现斐波那契数列
 */

//  递归实现, 递归容易造成爆栈，尾部调用可以解决递归的这个问题
let recursive2fibonacciCount = 0;
function recursive2fibonacci(num) {
  recursive2fibonacciCount++;
  if (num === 0) {
    return 0;
  }

  if (num === 1 || num === 2) {
    return 1;
  }

  return recursive2fibonacci(num - 1) + recursive2fibonacci(num - 2);
}

// 枚举实现
// 利用缓存
let cache2fibonacciCount = 0;
function cache2fibonacci(n) {
  let cache = {};

  function _cacheFn(num) {
    if (cache[num]) {
      return cache[num];
    }
    cache2fibonacciCount++;

    if (num === 0) {
      return 0;
    }

    if (num === 1 || num === 2) {
      return 1;
    }

    let prev = _cacheFn(num - 1);
    let next = _cacheFn(num - 2);
    cache[num - 1] = prev;
    cache[num - 2] = next;

    return prev + next;
  }

  return _cacheFn(n);
}

console.log(
  recursive2fibonacci(15),
  `需要递归次数: ${recursive2fibonacciCount}`
);
console.log(cache2fibonacci(15), `需要递归次数: ${cache2fibonacciCount}`);
