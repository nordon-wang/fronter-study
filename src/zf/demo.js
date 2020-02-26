const update = () => {
  console.log('update');
}

const arr = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splice']
const oldProto = Array.prototype
const proto = Object.create(oldProto)

arr.forEach(key => {
  proto[key] = function () {
    update()
    return oldProto[key].call(this, ...arguments)
  }
})


const observe = (obj) => {
  if (Array.isArray(obj)) {
    obj.__proto__ = proto
  }

  return obj
}

var a = [1, 2, 3]

function defineReactive(data, key, value) {
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      console.log(`get key:${key} value:${value}`);
      return value
    },
    set(newVal) {
      console.log(`set key:${key} value:${newVal}`);
      value = newVal
    }
  })
}

function observe(obj) {
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

observe(a)