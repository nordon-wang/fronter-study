/** 
 * 模拟 vue 劫持 array
*/

const arr = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice']
const oldProto = Array.prototype //保留数组原有的原型，不改变原有的，
const proto = Object.create(oldProto) // 新增一个

arr.forEach(methodName => {
  proto[methodName] = function (...args) {
    console.log('执行了');
    return oldProto[methodName].call(this, ...args)
  }
})

function observe(array) {
  if(Array.isArray(array)){
    array.__proto__ = proto
  }
  return array
}

let a = [1,2,3]
observe(a)
a.push(22)
console.log(a);
