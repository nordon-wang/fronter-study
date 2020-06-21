/** 
 * es5中的类 是用构造函数模拟
 *    es5中的类 可以当作函数直接调用, es6中的类不可以
 *    类中有两种属性
 *      1. 实例上的属性
 *      2. 公共属性
*/
function Animal() {
  // 若是直接调用, 不是使用 new调用, 抛出异常
  if (!(this instanceof Animal)) { // new的原理, 使用new的时候, this是Animal的实例, 则 this instanceof Animal 为true
    throw new Error('use new');
  }

  // 若是使用new, 则new.target指向自身, 否则为undefined, 但是在继承的时候不能使用,因为继承实例上属性的时候, 原来的es5是使用 Animal.call(this)的方式
  // if (!new.target) { 
  //   throw new Error('use new');
  // }

  this.info = { name: 'nordon' } // 实例上的属性
}

Animal.prototype.address = {
  city: 'shanghai'
}

Animal.prototype.say = function () {
  console.log('animal say ....');

}

// const a1 = new Animal()
// const a2 = new Animal()

// console.log(a1.info === a2.info); // false: info是实例上的属性, 因为info是每次new的时候,都会单独的实例化一次,info是每次实例化时重新创建的,每个实例特有的
// console.log(a1.address === a2.address); // true: address时公共属性, 无论实例化多少次,都是指向同一个
// console.log(a1.say === a2.say); // true

// __proto__ 存在兼容问题
// console.log(a1.__proto__ === Animal.prototype); // true
// console.log(Animal === Animal.prototype.constructor); // true
// console.log(a1.__proto__.__proto__ === Object.prototype); // true
// console.log(a1.__proto__.__proto__.__proto__); // null



/** 
 * 继承
 *    继承什么? 继承实例上的属性和公共属性
*/

function Tiger(name) {
  this.name = name

  // 调用Animal的构造函数, 并且让this指向子类
  // Animal.call(this) 只是继承了实例上的属性, type等, 此时并没有继承Animal上的公共属性,即访问不到say方法
  Animal.call(this)
}

// 继承Animal上的公共属性,此时Tiger的实例上可以访问Animal prototype上的say方法

// Tiger.prototype = Animal.prototype
/** 
 * Tiger.prototype = Animal.prototype
 *  将 Tiger prototype 指向 Animal prototype, 也就是 tiger 访问的时候会找到 Animal prototype, 此时Tiger的实例可以访问到了Animal prototype上的say方法
 *  此时会有一个问题, 就是在 Tiger 上想要定义一些公共属性和方法时会有问题
*/
// 问题1, 此时若是在 Tiger.prototype = Animal.prototype 之前为Tiger 增加公共属性, 会被覆盖
// Tiger.prototype.eat = function () {
//   console.log('Tiger eat.....');
// }

// 问题2, 此时若是在 Tiger.prototype = Animal.prototype 之后为Tiger 增加公共属性,这个时候 Tiger的实例是可以获取到 eat方法, 但是也会污染 Animal prototype, Animal的实例或者其他继承Animal的类也都可以访问到 eat方法
// Tiger.prototype = Animal.prototype
// Tiger.prototype.eat = function () {
//   console.log('Tiger eat.....');
// }
// const animal = new Animal()
// console.log(animal.eat);


/** 
 * Tiger.prototype.__proto__ = Animal.prototype
 *  __proto__ 存在兼容性问题
 *  自己找不到,通过原型链继续向上查找,此时Animal和Tiger不会再共享同一地址,不会相互影响
*/
// Tiger.prototype.__proto__ = Animal.prototype


/** 
 * Object.setPrototypeOf(Tiger.prototype, Animal.prototype)
 *  es6语法, 存在兼容性
 *  原理就是 Tiger.prototype.__proto__ = Animal.prototype
*/
// Object.setPrototypeOf(Tiger.prototype, Animal.prototype)


/** 
 * Tiger.prototype = Object.create(Animal.prototype)
 *  推荐 也是最常用的
 *  Object.create是在 Tiger.prototype 和 Animal prototype之间增加了一层
*/

/** 
 * Tiger.prototype = new Animal()
 *    此时可以拿到Animal上的实例属性和公共属性
 *    缺点: 若是 Animal需要接受Tiger实例化时传递的参数, 无法传递
*/

/** 
 * Object.create方式
 *  需要手动将constructor的指向指回来
*/
Tiger.prototype = Object.create(Animal.prototype, {
  constructor: { // 若是不将Tiger constructor指回到Tiger, 此时的Tiger实例tiger.constructor则指向Animal
    value: Tiger
  }
})
// Tiger.prototype.constructor = Tiger

const tiger = new Tiger('tiger')
console.log(tiger.constructor);
tiger.say()


/** 
 * Object.create 原理
*/
function create(parentPrototype) {
  function Fn() { }
  Fn.prototype = parentPrototype
  return new Fn()
}
function Parent(){ }
function Child(){ }

// Child prototype 和 Parent prototype之间并不是之间相关联的, 而是增加了一层,
Child.prototype = create(Parent.prototype)
const child = new Child()
// 此时的child.constructor 指向的是 Parent
// console.log(child.constructor);