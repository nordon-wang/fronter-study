/**
 * 1. 类型断言
 *  ts并不是万能的，有些情况ts也不能很好判断一个变量值的类型，此时就需要将类型检查的主动握到到自己的手中，告诉ts不需要检测了
 *  类型断言就是一个进行强类型转换的过程，把某个值强行指定为特定类型
 *  使用方式
 *  (<string>target) jsx不支持，并不建议使用
 *  (target as string) 推荐写法
 */

const getLen = (target: number | string): number => {
  if ((<string>target).length) {
    return (target as string).length;
  } else {
    return target.toString().length;
  }
};

/**
 * 2. 使用接口定义几乎任意结构
 */
interface Person {
  name: string;
  age: number;
  hobby?: string; // 可选属性
  //   [prop: string]: any; // 添加索引签名 绕开多余属性检测
}

function getP({ name, age, hobby }: Person) {
  console.log(`${name} -- ${age} -- ${hobby ? hobby : ''}`);
}

// getP({
//   name: 'nordon',
//   age: 18
// });

/**
 * 绕开多余属性检测
 */
// 2.1 利用 类型断言，告诉ts，我自己做了检测确保类型没啥大问题 不需要检测那么严格了 ✨✨
// getP({
//   name: 'nordon',
//   age: 18,
//   height: 183
// } as Person);

// 2.2 添加索引签名 ✨✨✨ 推荐使用
// 接口 定义增加[prop: string]: any; // 添加索引签名 绕开多余属性检测
// getP({
//   name: 'nordon',
//   age: 18,
//   height: 183
// });

// 2.3 利用类型兼容性 ✨
// const options = {
//   name: 'nordon',
//   age: 18,
//   height: 183
// };
// getP(options);

/**
 * 只读属性 readonly
 */
interface ReadonlyInfo {
  readonly name: string;
  age: number;
}

const readonlyInfo: ReadonlyInfo = {
  name: 'nordon',
  age: 18
};

// readonlyInfo.name = 'wy'; // error
readonlyInfo.age = 22;
// console.log(readonlyInfo);

/**
 * 函数类型， interface可以描述对象类型， 也可以描述方法
 */
interface CountFunc {
  // 花括号的内容称为: 调用签名
  (num1: number, num2: number): number;
}

// 形参名 可以不一致
const totalCount: CountFunc = (n1, n2) => n1 + n2;
// const totalCount2: CountFunc = (num1, num2) => `${num1} ${num2}`; // error
// totalCount(1, '2'); // error

/**
 * 索引类型
 *  可以使用接口描述索引的类型 和 通过索引得到的值 的类型， 可以同时给 索引和值 都设置类型
 *  ['a', 'b'] --> 通过 索引 0 得到 a 的值
 */
interface IndexInterface {
  [id: number]: string; // 可以设置 readonly
}

const index1: IndexInterface = {
  0: 'first',
  1: 'second',
  '2': 'three'
  //   sd: 'asd' // error
};

const index2: IndexInterface = ['first', 'second'];

/**
 * 继承接口
 *  一个接口可以被多个接口继承，一个接口也可以继承多个接口
 */

interface Animate {
  name: string;
}

interface AnimateActions {
  type: string;
}

interface Cat extends Animate, AnimateActions {
  eat: string;
}

interface Dog extends Animate {
  age: number;
}

const cat: Cat = {
  name: '小猫咪',
  type: 'cat',
  eat: 'fish'
};

const dog: Dog = {
  name: '旺财',
  age: 88
};

/**
 * 混合类型接口
 */
interface Counter {
  (): void; // 这里定义Counter这个结构必须包含一个函数，函数的要求是无参数，返回值为void，即无返回值
  count: number; // 而且这个结构还必须包含一个名为count、值的类型为number类型的属性
}
const getCounter = (): Counter => {
  // 这里定义一个函数用来返回这个计数器
  const c = () => {
    // 定义一个函数，逻辑和前面例子的一样
    c.count++;
  };
  c.count = 0; // 再给这个函数添加一个count属性初始值为0
  return c; // 最后返回这个函数对象
};
const counter: Counter = getCounter(); // 通过getCounter函数得到这个计数器
counter();
console.log(counter.count); // 1
counter();
console.log(counter.count); // 2
