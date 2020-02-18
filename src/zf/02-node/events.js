
function EventEmitter() {
  this._events = Object.create(null)
}

EventEmitter.prototype.on = function (eventName, fn) {
  // 若不是直接 new EventEmitter，而是通过继承，可能导致没有 _events，需要处理一下
  if(!this._events) {
    this._events = Object.create(null)
  }
  
  // 处理 newListener
  if(eventName !== 'newListener'){
    this.emit('newListener', eventName)
  }

  if(this._events[eventName]){
    this._events[eventName].push(fn)
  }else {
    this._events[eventName] = [fn]
  }
}

EventEmitter.prototype.emit = function (eventName, ...args) {
  if(this._events[eventName]){
    this._events[eventName].forEach(fn => fn(...args))
  }
}


EventEmitter.prototype.once = function (eventName, fn) {
  const one = (...args) => {
    fn(...args)
    this.remove(eventName, one)
  }

  one.fn = fn

  this.on(eventName, one)
}

EventEmitter.prototype.remove = function (eventName, fn) {
  if(this._events[eventName]){
    this._events[eventName] = this._events[eventName].filter(cb => cb !== fn && cb.fn !== fn) 
  }
}

module.exports = EventEmitter
