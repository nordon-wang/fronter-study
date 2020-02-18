/** 
 * 深拷贝
 */

const deepClone = (value, hash = new WeakMap) => {
  if (value == null) { // 排除 null undefined
    return value
  }

  if (typeof value !== 'object') { // 基础数据类型和函数
    return value
  }

  if(value instanceof RegExp) { // 正则
    return new RegExp(value)
  }

  if (value instanceof Date) { // 日期
    return new Date(value)
  }

  // 拷贝的可能是数据或者对象
  let instance = new value.constructor // {} || []
  if(hash.has(value)){
    return hash.get(value)
  }
  hash.set(value, instance) // 新的就放进来
  for (const key in value) {
    if(value.hasOwnProperty(key)){ // 排除原型上的方法
      instance[key] = deepClone(value[key], hash) // 递归处理
    }
  }

  return instance
}


//#region 
let obj = {
  name: 'nordon',
  person: {
    age: 18
  }
}

// let o = {...obj}
// let o = Object.assign(obj)
// let o = Object.create(obj) //  create之后的赋值， 是在新的实例上进行的，不会修改原型，而age会

// let o = JSON.parse(JSON.stringify(obj))
let o = deepClone(obj)
o.name = 'new name'
o.person.age = 22
console.log(obj, o);
//#endregion

