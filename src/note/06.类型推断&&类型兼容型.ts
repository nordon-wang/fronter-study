// 类型推断&&类型兼容型

/**
 * 1. 类型推断
 *  ts 不仅会在指明类型的时候进行类型推断，还会根据代码进行隐士推断
 */

/**
 * 1.1 单独类型
 */
let infer1 = 'infer str';
// infer1 = 123; // error 因为初始化的时候定义的值是 string 类型，再进行其他类型的赋值，不符合初始化

/**
 * 1.2 联合类型
 */
let infer2 = [1, 'infer'];
infer2 = ['2', 3, 'true'];
// infer2 = ['2', 3, true]; // error 因为数组在初始化的时候，类型是 number|string， 再进行赋值的时候，多一个boolean类型，不符合初始化

let infer3 = true ? 'infer' : 2;
infer3 = 11;
// infer3 = false; // error

/**
 * 1.3 执行上下文推断
 */
window.onclick = function(event) {
  // console.log(event.a); // error 因为ts会根据执行上下文推断 event 是事件对象
  console.log(event.target);
};

/**
 * 2. 类型兼容
 *  js是弱语言类型，ts的出现出就是为了解决类型校验的问题，但是ts也不会死板的将js的灵活性给磨灭，在保证类型校验的前提下，还是会保留js的灵活性
 */

/**
 * 2.1 函数兼容性
 */

/**
 * 2.1.1 函数参数个数
 *  兼容函数参数个数，被赋值的函数(y)的参数个数要大于 赋值函数(x)的个数
 */
let x = (a: number) => 1;
let y = (a: number, b: string) => 1;

// y = x;
// x = y; // error 函数 y 的参数个数比函数 x 多

const arr1 = [1, 2, 3];
arr1.forEach((item, index, arr) => {});
// error  因为函数的参数个数大于函数的个数，参数个数主要小于个数就可以使用
// arr1.forEach((item, index, arr, d) => {});
// x(1, 2);

/**
 * 2.1.2 函数参数类型
 *  函数的参数类型需要对应
 */
let z = (a: string) => '';
// z = x; // error 因为函数 x 的参数类型和函数 z 的类型不一致

/**
 * 2.1.3 剩余参数和可选参数
 */

// 剩余参数
const getNum1 = (arr: number[], cb: (...args: number[]) => number): number => {
  return cb(...arr);
};

getNum1([1, 2], (...args: number[]): number => {
  return args.length;
});

// 可选参数
const getNum2 = (
  arr: number[],
  cb: (arg1: number, arg2?: number) => number
): number => {
  // return cb(...arr); // 会报错， 因为 arr 可能是空数组
  return cb(arr[0], ...arr.slice(1));
};
getNum2([1, 2], (...args: number[]): number => {
  return args.length;
});

/**
 * 2.1.4 函数重载
 */
function overload1(n1: number): number;
function overload1(str: string): string;
function overload1(arg: any) {
  return arg;
}

function overload2(n1: number): number;
// function overload2(str: string): string;
function overload2(arg: any) {
  return arg;
}

// ok
// let ol = overload2;
// ol = overload1;

// error 因为 overload2的参数 对比 overload1， 缺少了 function overload2(str: string): string; 类型
// let ol = overload1;
// ol = overload2;

/**
 * 2.2 枚举
 *
 */

// 数字枚举成员类型与数字类型互相兼容
enum Enum1 {
  Start = 1,
  End
}

let e1 = Enum1.Start;
e1 = 2;
e1 = 11;

// 不同枚举值之间 不兼容
enum Enum2 {
  Start,
  End
}

enum Enum3 {
  Start,
  End
}

let e2 = Enum2.Start;
// e2 = Enum3.Start; // error

// 字符串枚举成员类型和字符串类型是不兼容的
enum Enum4 {
  Start = 'start',
  End = 'end'
}

let e4 = Enum4.Start;
// e4 = 't'; // error

/**
 * 2.3 类
 */

/**
 * 2.3.1 基本比较
 *  比较 类的类型的值的兼容性时，只比较实例成员，类的静态成员和构造函数不进行比较
 */
class C1 {
  static static1: number;
  constructor(public public1: string) {}
}

class C2 {
  static static1: string;
  constructor(public public1: string) {}
}

class C3 {
  constructor(public public1: number) {}
}

let c1: C1;
let c2: C2;
let c3: C3;
c1 = c2;
// c1 = c3; // error
// c2 = c3; // error

/**
 * 2.3.2 私有成员和受保护成员
 */

class Private1 {
  // private p: number;
  protected p: number;
}

class Private1Child extends Private1 {
  constructor() {
    super();
  }
}

class Private2 {
  // private p: number;
  protected p: number;
}
/**
 * p1 指定为 Private1 类型，为期赋值 Private1Child 类型是可以兼容的
 * 因为 Private1Child 是继承了 Private1 的， 他们俩的实例属性是没有差别的
 */
let p1: Private1 = new Private1Child();
/**
 * 当将 p2 指定为 Private1 类型，却为其赋值为 Private2类型的时候，会报错
 *  Private1 的 p 属性是私有成员，外界是不能访问的，所以不兼容
 *  受保护的成员和私有成员保持一致
 */
// let p2: Private1 = new Private2();

/**
 * 2.4 泛型
 */

/**
 * 接口的泛型没有在接口中使用
 *  g1 和 g2 是 Generic1 接口实现的， 区别是实现时泛型参数T的类型不同，ts 是结构性类型结构，所以是兼容的
 */
interface Generic1<T> {}
let g1: Generic1<number>;
let g2: Generic1<string>;
g1 = g2;

/**
 * 接口的泛型在接口中使用
 *  此时便不能兼容了
 */
interface Generic2<T> {
  data: T;
}

let g3: Generic2<number>;
let g4: Generic2<string>;
// g3 = g4; // error
