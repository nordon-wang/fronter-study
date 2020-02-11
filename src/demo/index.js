class Event {
  constructor(){
      this.subs = {}        
  }
  
  on(eventName, fn) {
      // fn 不是函数
      if(typeof fn !== 'function'){
          return false;
      }
         
      // 存在
      if(this.subs[eventName]){
          this.subs[eventName].push(fn)
      }else { // 不存在
          this.subs[eventName] = [fn]
      }
      
      return this
  }
  
  // 触发
  off(eventName, fn) {
      const subs = this.subs[eventName] || []
      
      // 存在 移除对应的 fn
      if(fn){
          this.subs[eventName] = subs.filter(cb => cb !== fn)
          console.log( subs.filter(cb => cb === fn));
          
      }else { // 不存在 移除对应eventName的所有的
          delete this.subs[eventName]
      }
      
      return this
  }
  
  // 触发一次
  once(eventName, fn){
      function _once(){
          _once.on()
          this.off(eventANme, _once)
      }
      
      _once.on = fn
      this.on(eventName, _once)
      return this
  }
  
  trigger(eventName) {
      const subs = this.subs[eventName] || []
      
      subs.forEach(function(cb) {
          cb.apply(null, arguments)
      })
      
      return this
  }
}

const ev = new Event()

function a() {
  console.log('11');
}

ev.on('hah', a)

ev.on('hah', function () {
  console.log('22');
})


ev.off('hah', a)

ev.trigger('hah')