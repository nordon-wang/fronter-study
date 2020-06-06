/**
 * es5 模拟 class
 *  es5中没有类， 通过构造函数模拟
 *  类上有两种属性， 1.实例上的属性 2.公共属性
*/

// 问题：构造函数可以通过new 实例化，也可以作为普通的函数执行，class不可以
function Animal(name) {
  // 若是 new Animal时， this就是 Animal的一个实例
  // es6中提供了 new.target 来判断
  if(!(this instanceof Animal)){ // !new.target
    throw "Animal() must be called with new";
  }

  this.name = name // 实例上的属性
}

Animal.prototype.eat = function () { // 公共属性
}


/** 
 * 继承
*/
//#region 
function Person() {
  this.name = 'a'
}

Person.prototype.say = function () {
  console.log('person say');
}

function Area(area) {
  Person.call(this)
  this.area = area
}

// Area.prototype = Person.prototype //错误的
// Area.prototype.__proto__ = Object.create(Person.prototype) // 尽量不要使用 __proto__
// Object.setPrototypeOf(Area.prototype, Person.prototype)

// 和上面不同的是， Object.create 在中间增加了一层
// Area.prototype = Object.create(Person.prototype)

// Object.create  原理模拟
function objectCreate(parentPrototype) {
  function Fn() {}
  Fn.prototype = parentPrototype
  return new Fn()
}
// Area.prototype = objectCreate(Person.prototype)
Area.prototype = Object.create(Person.prototype, {
  constructor:{ 
    value: Area
  }
})
// Area.prototype.constructor = Area // 将构造重新指向自身，否则 p.constructor 会指向 Person

const p = new Area('非洲')
console.log(p.constructor);
console.log(p.name);
p.say()

//#endregion



/** 
 * class
*/

class AnimalClass {
  type = 'type..'
  constructor(name) {
    this.name = name
  }
}

const ac1 = new AnimalClass('小黄')
// console.log(ac1);
// console.log(ac1.hasOwnProperty('type'));
// console.log(ac1.hasOwnProperty('name'));
var arr = []
var merged = arr.reduce(function(a, b) {
  a.concat(b);
}); // Noncompliant: No return statement
let asd = 'asd'

function foo() {
  console.log("Hello, World!");
}
