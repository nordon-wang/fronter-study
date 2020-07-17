function Person() {
  this.name = 'nordon'
}

const getSingleInstance = (function(){
   var singleInstance
  return function() {
       if (singleInstance) {
          return singleInstance
       } 
      return singleInstance = new Person()
  }
})()

const instance1 = new getSingleInstance()
const instance2 = new getSingleInstance()