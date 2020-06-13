/** 
 * 元编程
 *  可以改变js源代码的功能, 改变js原有的功能
*/


/** 
 * 迭代器 iterator
*/

/** 
 * 1. 将类数组转为数组
 *  由于类数组具有 iterator , 可以直接转换为数组
*/
function iterator1() {
  console.log([...arguments]);
}

// iterator1()

/** 
 * 2. 如何将对象转为数组
*/
function iterator2() {
  console.log([...{
    0: 1,
    1: 2,
    length: 2,
    [Symbol.iterator]() {
      // 迭代器: 具有next方法, 而且方法执行后, 需要返回一个对象,这个对象需要包含 value 和 done,
      // next会一直执行, 知道 done 为 true结束
      const len = this.length
      let index = 0

      return {
        next: () => {
          return {
            value: this[index++],
            done: index === len + 1
          }
        }
      }
    }
  }]);
}
// iterator2()


function iterator3() {
  console.log([...{
    0: 1,
    1: 2,
    length: 2,
    [Symbol.iterator]: function* () {
      let index = 0
      while (index !== this.length) {
        yield this[index++]
      }
    }
  }]);
}
// iterator3()

/** 
 * instanceof
*/
let iObj = {
  a: 1
}

let iObj2 = {
  [Symbol.hasInstance] () {
    return 'a' in iObj
  }
}

// console.log(iObj instanceof iObj2);


/**
 * toPrimitive
*/
let o1 = {
  [Symbol.toPrimitive] (value) { // 方法
    // 默认转换时,就是趋势是转换为字符串 value === default  >>> o1 + 1
    // 若是趋势是转换为数字 value === number >>> o1 * 1
    console.log(value);
    return '66'
  }
}
// console.log(o1 + 1);


/** 
 * toString
*/

let o2 = {
  get [Symbol.toStringTag] () { // 属性
    return 'o2'
  }
}

// console.log(o2.toString()); // [object o2]


/** 
 * 衍生对象
*/
class MyArray extends Array {
  constructor(...args) {
    super(...args)
  }

  // 若是不改变衍生对象的类的构造函数, 则 MyArray的实例的实例 arr1 instanceof MyArray 为true
  static get [Symbol.species] () {
    return Array // 控制衍生对象的类的构造函数
  }
}

let myArr = new MyArray(1,2,3)
let arr1 = myArr.map(item => item * 2) // 衍生出来的结果是当前的实例
// console.log(myArr);
// instanceof 原理
// console.log(arr1 instanceof Array);
// console.log(arr1 instanceof MyArray);

