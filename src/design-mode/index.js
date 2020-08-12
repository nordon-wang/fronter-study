// 定义发布者类
class Publisher {
  constructor() {
    this.observers = []
    console.log('Publisher created')
  }
  // 增加订阅者
  add(observer) {
    console.log('Publisher.add invoked')
    this.observers.push(observer)
  }
  // 移除订阅者
  remove(observer) {
    console.log('Publisher.remove invoked')
    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1)
      }
    })
  }
  // 通知所有订阅者
  notify() {
    console.log('Publisher.notify invoked')
    this.observers.forEach((observer) => {
      observer.update(this)
    })
  }
}

// 定义一个具体的需求文档（prd）发布类
class PrdPublisher extends Publisher {
  constructor() {
      super()
      // 初始化需求文档
      this.prdState = null
      // 韩梅梅还没有拉群，开发群目前为空
      this.observers = []
      console.log('PrdPublisher created')
  }
  
  // 该方法用于获取当前的prdState
  getState() {
      console.log('PrdPublisher.getState invoked')
      return this.prdState
  }
  
  // 该方法用于改变prdState的值
  setState(state) {
      console.log('PrdPublisher.setState invoked')
      // prd的值发生改变
      this.prdState = state
      // 需求文档变更，立刻通知所有开发者
      this.notify()
  }
}

// 定义订阅者类
class Observer {
  constructor() {
      console.log('Observer created')
  }

  update() {
      console.log('Observer.update invoked')
  }
}


class EventEmitter {
  constructor() {
    // handlers是一个map，用于存储事件与回调之间的对应关系
    this.handlers = {}
  }

  // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
  on(eventName, cb) {
    // 先检查一下目标事件名有没有对应的监听函数队列
    if (!this.handlers[eventName]) {
      // 如果没有，那么首先初始化一个监听函数队列
      this.handlers[eventName] = []
    }

    // 把回调函数推入目标事件的监听函数队列里去
    this.handlers[eventName].push(cb)
  }

  // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
  emit(eventName, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.handlers[eventName]) {
      // 如果有，则逐个调用队列里的回调函数
      this.handlers[eventName].forEach((callback) => {
        callback(...args)
      })
    }
  }

  // 移除某个事件回调队列里的指定回调函数
  off(eventName, cb) {
    const callbacks = this.handlers[eventName]
    const index = callbacks.indexOf(cb)
    if (index !== -1) {
      callbacks.splice(index, 1)
    }
  }

  // 为事件注册单次监听器
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb.apply(...args)
      this.off(eventName, wrapper)
    }
    this.on(eventName, wrapper)
  }
}

const fn1 = () => {

}

const fn2 = () => {}

const fnList = ['123',fn1, fn2]

console.log(fnList.indexOf(fn2));


const iterator = arr => {
  let index = 0
  let len = arr.length

  return  {
    next() {
      const done = index >= len
      const value = done ? undefined : arr[index]
      ++index

      return {
        done,
        value
      }
    }
  }
}