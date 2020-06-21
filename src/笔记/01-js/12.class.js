/**
 *  es6类
 *    __proto__ 指向所属类的原型
 *    prototype 所有类都有一个 prototype 属性
 *    constructor 每个类的原型上都有这个属性
*/

class Animal {
  // 等价于 constructor中的 this.info = {}
  info = { // 声明到实例上的, 实例属性, 等价
    type: 'animal'
  }

  constructor() {
    this.type = 'animal' // 实例属性
  }

  say() { // 原型上的公共属性, Animal.prototype.say
    console.log('animal say...', this);
  }

  // Object.defineProperty(Animal.prototype, conut)
  // 相当于 Animal.prototype.count = 1
  get count() {
    return 1
  }

  // es6 静态方法
  static staticSay() { // === Animal.staticSay 
    console.log('staticSay');
  }

  // es7 静态属性
  static staticCount = 'staticCount' // es7 才有, es6中只支持静态方法

  // es6 模拟静态属性
  static get getStaticCount() {
    return 'getStaticCount'
  }

}

// const a = new Animal()
// 如果将类中的方法拿出来用, 必须要绑定this, 不然原型上的方法调用时 this 为 undefined
// const say = a.say
// say() // this 是 undefined
// 必须绑定
// const say = a.say.bind(a)
// say()


/** 
 * 继承
 *  静态方法和属性在es6中, 是可以被子类继承的
*/

class Tiger extends Animal {
  constructor(name) {
    super() // Animal.call(this) 此时的super 指向的是父类
    this.name = name
    
  }

  static getStaticCount() {
    // 获取父类的静态属性
    // super 指向的是父类
    console.log(super.staticCount);
  }

  say() {
    // 实例调用, 会调用 Tiger 上的 say, 若是还想调用父类Animal的say
    super.say() // 调用父类的公共方法, 此时的super 指向的是父类的原型 Animal.prototype
    console.log('tiger say ...');
    
  }
}

const tiger = new Tiger('xiaohu')
console.log(tiger);


/** 
 * new
*/

function NewObj() {
  this.name = 'nordon'
  this.age = 18
}

NewObj.prototype.say = function () {
  
}

function _new(content, ...args) {
  // 1. 创建一个对象, 并且将对象传入到函数中作为this
  let obj = {}
  content.call(obj)
  obj.__proto__ = content.prototype
  return obj
}

let o = _new(NewObj)
console.log(o);
