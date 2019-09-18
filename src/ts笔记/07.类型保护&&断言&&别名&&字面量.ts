// 类型保护 && 显示复制断言 && 别名 && 字面量类型

/**
 * 1. 类型保护
 *  类型保护可以很好的增强js的健壮性，避免一些风险
 */

const getValue1 = () => {
  const num = Math.random();

  return num > 0.5 ? num : 'a';
};

const value1 = getValue1();

// value1.length 直接使用会报错，getValue1 返回值的类型是 number | string
// if (value1.length) {
// } else {
// }

/**
 * 1.1 利用泛型解决
 */
if ((<string>value1).length) {
  console.log((value1 as string).length);
} else {
  console.log((value1 as number).toFixed(2));
}

/**
 * 1.2 利用 typeof 解决
 *  ts 中使用 typeof 有些要求
 *    a: 只能使用 === 或 !== 两种形式进行比较, 可以使用 typeof === 'string', 不能 (typeof val).includes('string)
 *    b: type 把 number, string, boolean, symbol 四种类型视为 保护类型， 例如 typeof obj === 'object'， ts 只会将其视为js语句，不具有保护类型的作用
 */

if (typeof value1 === 'string') {
  console.log(value1.length);
} else {
  console.log(value1.toFixed(2));
}

/**
 * 1.3 利用 instanceof 解决
 */
const getObj1 = () => {
  const num = Math.random();

  return num > 0.5 ? [1] : new Date();
};

let obj1 = getObj1();

// error
// if (obj1.length) {
// } else {
// }

if (obj1 instanceof Array) {
  console.log(obj1.length);
} else {
  console.log(obj1.getHours());
}

/**
 * 1.4 自定义类型保护
 */

function isStr(val: number | string): val is string {
  return typeof val === 'string';
}

if (isStr(value1)) {
  console.log(value1.length);
} else {
  console.log(value1.toFixed(3));
}

/**
 * 2. 显示复制断言
 */

/**
 * 2.1 严格模式下 null 和 undefined 区别
 *  若是在tsconfig.json 中将 strictNullChecks 设置为 true之后，就不能在将 null 和 undefined 赋值给除了他俩自身和 void 以外的其他任意类型值了，但是在开发过程中，的确会存在将他俩赋值给一个初始化的变量，然后根据业务逻辑再进行赋值，这时候就需要使用联合类型了
 */

let showVar1 = 'showVar1';
// showVar1 = null; // error
let showVar2: string | null = 'showVar2';
showVar2 = null;
// showVar2 = undefined; // error, ts是将 null 和 undefined 区分的，number|null 和 number|undefined 是不一样的

/**
 * 2.2 可选参数&可选属性
 *  如果配置开启 strictNullChecks 之后，可选参数和可选属性会自动加上 | undefined
 */

//  n2 的类型是联合类型 number|undefined
const selectVar = (n1: number, n2?: number) => {};
selectVar(1, undefined);
// selectVar(1, null);  // error

interface SelectVarInterface {
  name: string;
  age?: number;
}

let selectVarInterface: SelectVarInterface = {
  name: 'nordon',
  age: undefined
  // age: null // error
};

/**
 * 3. 类型别名
 *  就是给一个类型起一个别名，方面在其他地方使用
 */

/**
 * 3.1 基础类型
 */
type TypeStr1 = string;
// let ts1: TypeStr1 = 1; // error

/**
 * 3.2 泛型
 */
type PositionType1<T> = {
  x: T;
  y: T;
};

let pt: PositionType1<number> = {
  x: 1,
  y: 2
  // y: '2' //  error
};

let pt2: PositionType1<string> = {
  x: '1px',
  y: '2px'
  // y: 2 // error
};

/**
 * 3.3 属性
 *  使用类型别名时，可以在属性中自引用自己，
 */
type CiteSelf<T> = {
  name: T;
  citeSelf?: CiteSelf<T>;
};

let cs: CiteSelf<string> = {
  name: '一级',
  citeSelf: {
    name: '二级',
    citeSelf: {
      name: '三级'
      // citeSelf: 'error' // error 因为 类型不对
    }
  }
};

// ⚠️ 只能在对象属性中引用类型别名自己，不能直接使用
// type CiteSelf2 = CiteSelf[];

// ⚠️ 另外要注意，因为类型别名只是为其它类型起了个新名字来引用这个类型，所以当它为接口起别名时，不能使用 extends、implements

/**
 * 3.4 和接口区别
 *  接口和类型别名有时可以起到同样作用，使用参考
 *    1. 定义的类型需要用于扩展、就是需要使用 implements 等修饰符时，使用接口
 *    2. 当无法通过接口，并且需要使用联合类型或元组类型，用类型别名。
 */
type CiteSelf3 = {
  name: string;
};

interface diffType {
  name: string;
}

let cs3: CiteSelf3 = {
  name: 'CiteSelf3'
};

let dt1: diffType = {
  name: 'diffType'
};

cs3 = dt1;

/**
 * 4. 字面量类型
 */

/**
 * 4.1 字符串字面量类型
 *  字符串字面量类型其实就是字符串常量，与字符串类型不同的是它是具体的值。
 */

type ConstStr = 'nordon';
// let cs1: ConstStr = 'wy'; // error

type Direction = 'left' | 'right' | 'top' | 'bottom';

const getDirection = (direction: Direction): string => {
  return direction.slice(0);
};
// getDirection('test'); // error test 不在 定义好的几个里面
getDirection('right');

/**
 * 4.2 数字字面量类型
 *  另一个字面量类型就是数字字面量类型，它和字符串字面量类型差不多，都是指定类型为具体的值。
 */

type Age = 18;

interface InfoNumber {
  name: string;
  age: Age;
}

let info1: InfoNumber = {
  name: 'nordon',
  age: 18
  // age: 22 // error age 只能是 18
};
