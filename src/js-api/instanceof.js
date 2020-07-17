/** 
 * typeof
 * instanceof
 * Object.prototype.toString.call
 * constructor
*/
const _instanceof =  (left, right) =>{
  if(typeof left !== 'object') {
    return false
  }

  while (true) {
    if(left === null) return false

    if(left.__proto__ === right.prototype) return true
    left = left.__proto__
  }
}


function Demo() {
  this.name = 'wy'
}
let d = new Demo()

// console.log(d.__proto__ === Demo.prototype);
// console.log(d instanceof Demo);
// console.log(_instanceof(d, Demo));


/** 
 * 当使用 + 运算符计算 string 和其他类型相加时，都会转换为 string 类型；
 * 其他情况，都会转换为 number 类型，但是 undefined 会转换为 NaN，相加结果也是 NaN
 * 当使用 + 运算符计算时，如果存在复杂类型，那么复杂类型将会转换为基本类型，再进行运算
*/


// const obj = {}
// console.log(({}).valueOf());
// console.log(({}).toString());

// const arr = [1,23]
// console.log((arr).valueOf());
// console.log(typeof (arr).toString());
// console.log(new arr.constructor)
// console.log(new Demo.constructor)


