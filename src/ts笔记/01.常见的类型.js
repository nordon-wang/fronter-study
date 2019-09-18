// 常见的类型
/* *
 * 1. number
 * 注意，就是 number 和 Number 的区别：TS中指定类型的时候要用 number，这个是TypeScript的类型关键字。
 * 而 Number 为JavaScript的原生构造函数，用它来创建数值类型的值，它俩是不一样的。
 * 包括你后面见到的string、boolean 等都是TypeScript的类型关键字，不是JavaScript语法，这点要区分开。
 */
let nu = 123;
// nu = 'asd'; // error
nu = 234;
/**
 * 2. boolean
 */
let bol = true;
/**
 * 3.TypeScript 和 JavaScript 一样，所有数字都是浮点数，所以只有一个number类型，而没有 int 或者 float 类型。
 * 而且 TypeScript 还支持 ES6 中新增的二进制和八进制数字字面量，
 * 所以 TypeScript 中共支持二、八、十和十六四种进制的数值
 */
let num1;
num1 = 123;
// num1 = '123'; // error 不能将类型"123"分配给类型"number"
num1 = 0b1111011; // 二进制的123
num1 = 0o173; // 八进制的123
num1 = 0x7b; // 十六进制的123
/**
 *4. string
 */
let str = 'str';
/**
 * 5. array
 */
let list1 = [1, 2, 3];
let list2 = [1, 2, 'nordon'];
let list3 = ['str']; // 不建议使用
/**
 * 6. null && undefined
 *  null 和 undefined 有一些共同特点，所以我们放在一起讲。
 *  说它们有共同特点，是因为在 JavaScript 中，undefined 和 null 是两个基本数据类型。
 *  在 TypeScript 中，这两者都有各自的类型即 undefined 和 null，也就是说它们既是实际的值，也是类型
 *
 *  默认情况下 undefined 和 null 可以赋值给任意类型的值，也就是说你可以把 undefined 赋值给 void 类型，也可以赋值给 number 类型。
 *  当你在 tsconfig.json 的"compilerOptions"里设置了"strictNullChecks": true时，那必须严格对待。
 *  undefined 和 null 将只能赋值给它们自身和 void 类型，
 */
let unde = undefined;
let n = null;
/**
 * 7.tuple 元组
 *  元组可以看作是数组的扩展，表示已知元素的个数和类型，就是已经知道的数组的长度以及每个位置的数据类型
 *  为元组赋值时， 个数和类型需要一一匹配对应
 */
let tuple1 = [1, 'nordon', true];
// tuple1[1] = 1; error, 应该是 string
tuple1[1] = 'wy';
/**
 * 8.enum 枚举
 */
//  ts会默认为 enum 的每个分配编号，默认0开始
var Roles1;
(function (Roles1) {
    Roles1[Roles1["SUPER_ADMIN"] = 0] = "SUPER_ADMIN";
    Roles1[Roles1["ADMIN"] = 1] = "ADMIN";
    Roles1[Roles1["USER"] = 2] = "USER";
})(Roles1 || (Roles1 = {}));
// 直接使用名字获取 或者下标
// console.log(Roles1[0]); // SUPER_ADMIN
// console.log(Roles1.SUPER_ADMIN); // 0
// console.log(Roles1['ADMIN']); // 1
// 修改ts为 enum 设置的默认编号
var Roles2;
(function (Roles2) {
    Roles2[Roles2["SUPER_ADMIN"] = 1] = "SUPER_ADMIN";
    Roles2[Roles2["ADMIN"] = 2] = "ADMIN";
    Roles2[Roles2["USER"] = 3] = "USER";
})(Roles2 || (Roles2 = {}));
// console.log(Roles2[2]); // ADMIN
// console.log(Roles2['USER']); // 3
// 修改多个默认编号
var Roles3;
(function (Roles3) {
    Roles3[Roles3["SUPER_ADMIN"] = 2] = "SUPER_ADMIN";
    Roles3[Roles3["ADMIN"] = 4] = "ADMIN";
    Roles3[Roles3["USER"] = 10] = "USER";
})(Roles3 || (Roles3 = {}));
// console.log(Roles3[4]); // ADMIN
// console.log(Roles3.USER); // 10
/**
 * 9. any 任意类型
 *  在编写代码的时候，有时候会不知道数据具体是什么类型，这个时候就可以使用 any 类型, 更好的建议是 使用unknown 更加安全
 *  any 需要慎用，若是大规模的使用 any， ts将没啥意义了
 */
let anyArr = [1, true];
let any1;
any1 = 1;
any1 = 'any str';
/**
 * 10. void 表示没有任意类型， 就是什么类型都不是， 和 any 相反
 *  常用于表示 函数没有返回值
 *  void类型的变量只能赋值为 null、undefined ， 其他类型不能赋值给 void类型
 */
function voidFun() {
    console.log('函数voidFun 没有任何返回值，只是log一下');
}
/**
 * 11. never 指那些永不存在的值的类型，
 * 它是那些总会抛出异常或者根本不会有返回值的函数表达式的返回值类型，
 * 当变量被永不为真的类型保护所约束时，该变量也是 never 类型
 */
//  总是抛出异常的,所以返回值是never类型，表明其返回值永不存在
function neverErr() {
    throw new Error('抛出异常的 never');
}
/**
 * 没有返回值的函数表达式
 * 注意和 void的区别，voidFun 是定义的时候没有返回值，而 neverFunc 因为死循环 是不会有返回值，
 */
function neverFunc() {
    while (true) {
        console.log('一直执行');
    }
}
/**
 * 12. unknown 表示未知的类型
 *  和 any 的区别: unknown 比 any 安全点，
 */
/**
 * 为什么 unknown 比 any 安全？
 *  若是将一个变量指定为any类型之后，这个变量就废了，和js无差了，可以对这个变量进行任意的属性、方法的访问，无非就是报错嘛
 *  若变量是 unknown 类型，若是没有对其通过基于控制流的类型断言来缩小范围，是不能对其进行操作的
 */
let any2;
// console.log(any2.name);  // error
// console.log(any2.length); // error
/**
 * 13. 交叉类型 取多个类型的并集， 使用 & 符号
 */
// const crossMerge = <T, U>(arg1: T, arg2: U): T & U => {
//   let res = <T & U>{};
//   res = { ...arg1, ...arg2 };
//   return res;
// };
/**
 * 14. 联合类型 要求值的类型符合联合类型中的任意一种类型即可， 使用 | 符号
 */
function unionFunc(content) {
    if (typeof content === 'string') {
        return content.length;
    }
    return content.toString().length;
}
// console.log(unionFunc('asd'));
// console.log(unionFunc(2));
/**
 * 15. symbol
 */
// 普通的 symbol
let symbol1 = Symbol('s');
/**
 * unique symbol
 *  是symbol的子集， 只能用作常量的定义和属性名，且类型只能是 const
 */
const uniqueSymbol1 = Symbol('unique symbol 1');
//# sourceMappingURL=01.常见的类型.js.map