
/** 
 * 对象存取器
*/
let d1 = {
  _a: '', // 需要使用一个临时变量存储
  set(newValue) {
    this._a = newValue
  },
  get() {
    return this._a
  }
}

d1.a = 1
// console.log(d1.a);


/** 
 * 数据劫持
*/
const update = () => {
  console.log('update...');
}

let o1 = {}
let _a = 0 // 因为使用Object.defineProperty, 需要一个公共的值去修改

Object.defineProperty(o1, 'a', {
  enumerable: true, // 是否可枚举, 设置为true, value的值才可以被枚举
  configurable: true, // 是否可配置, 可删除
  // value: 0, // 默认设置的值, 默认是不可以枚举的
  // writable: true, // 是否可写
  set(newValue) { // 设置了存取器, value和writable就不需要显示设置了, 因为get和value和功能一样,都是获取值,set和writable一样,都是设置
    _a = newValue
    update()
  },
  get() {
    return _a
  }
})

// o1.a = 111
// console.log(o1.a);


/** 
 * 劫持
*/

let obj1 = {
  foo: {
    a: 1
  },
  b: 2
}


const walk = (obj, key, val) => {
  observer(val) // 递归劫持数据

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      return val
    },
    set(newValue) {
      val = newValue
      update()
    }
  })
}

const observer = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return
  }

  for (const key in obj) {
    //因为使用Object.defineProperty, 需要一个公共的值去修改, 每次调用walk 都可以生成一个公共的 value值
    walk(obj, key, obj[key])
  }
}

let o2 = observer(obj1)
obj1.b = 444
console.log(obj1.b);
