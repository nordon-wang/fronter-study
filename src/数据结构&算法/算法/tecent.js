/** 
 * js 最大数 2^53 - 1
*/

/** 
 * '123' + '123'
*/
const calc = (a, b) => {
  // 容错
  if(typeof a !== 'string' || typeof b !== 'string') {
    throw new Error('type error')
  }

  // 将字符串分割为数组
  const arr1 = a.split('')
  const arr2 = b.split('')
  // 存储结果
  let result = []

  // 循环至两个数组都为空
  while (arr1.length || arr2.length) {
    const aVal = +arr1.pop() || 0
    const bVal = +arr2.pop() || 0
    result.unshift(aVal + bVal)
  }

  // 处理数组 超过 10的
  for(let i = result.length - 1; i >= 0; i--) {
    let currentVal = result[i]
    if(currentVal >= 10) {
      
      if(i === 0) {
        console.log(currentVal, result);
        result.unshift(1)
      }else {
        result[i - 1] = +result[i - 1] + 1
        console.log(currentVal, result);
      }
      result[i] = currentVal - 10
    }
  }

  console.log(result);
}

calc('98', '999')

console.log(98 + 999);