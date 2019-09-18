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
window.onclick = function (event) {
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
let x = (a) => 1;
let y = (a, b) => 1;
// y = x;
// x = y; // error 函数 y 的参数个数比函数 x 多
const arr1 = [1, 2, 3];
arr1.forEach((item, index, arr) => { });
// error  因为函数的参数个数大于函数的个数，参数个数主要小于个数就可以使用
// arr1.forEach((item, index, arr, d) => {});
// x(1, 2);
/**
 * 2.1.2 函数参数类型
 *  函数的参数类型需要对应
 */
let z = (a) => '';
// z = x; // error 因为函数 x 的参数类型和函数 z 的类型不一致
/**
 * 2.1.3 剩余参数和可选参数
 */
// 剩余参数
const getNum1 = (arr, cb) => {
    return cb(...arr);
};
getNum1([1, 2], (...args) => {
    return args.length;
});
// 可选参数
const getNum2 = (arr, cb) => {
    // return cb(...arr); // 会报错， 因为 arr 可能是空数组
    return cb(arr[0], ...arr.slice(1));
};
getNum2([1, 2], (...args) => {
    return args.length;
});
function overload1(arg) {
    return arg;
}
// function overload2(str: string): string;
function overload2(arg) {
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
var Enum1;
(function (Enum1) {
    Enum1[Enum1["Start"] = 1] = "Start";
    Enum1[Enum1["End"] = 2] = "End";
})(Enum1 || (Enum1 = {}));
let e1 = Enum1.Start;
e1 = 2;
e1 = 11;
// 不同枚举值之间 不兼容
var Enum2;
(function (Enum2) {
    Enum2[Enum2["Start"] = 0] = "Start";
    Enum2[Enum2["End"] = 1] = "End";
})(Enum2 || (Enum2 = {}));
var Enum3;
(function (Enum3) {
    Enum3[Enum3["Start"] = 0] = "Start";
    Enum3[Enum3["End"] = 1] = "End";
})(Enum3 || (Enum3 = {}));
let e2 = Enum2.Start;
// e2 = Enum3.Start; // error
// 字符串枚举成员类型和字符串类型是不兼容的
var Enum4;
(function (Enum4) {
    Enum4["Start"] = "start";
    Enum4["End"] = "end";
})(Enum4 || (Enum4 = {}));
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
    constructor(public1) {
        this.public1 = public1;
    }
}
class C2 {
    constructor(public1) {
        this.public1 = public1;
    }
}
class C3 {
    constructor(public1) {
        this.public1 = public1;
    }
}
let c1;
let c2;
let c3;
c1 = c2;
// c1 = c3; // error
// c2 = c3; // error
/**
 * 2.3.2 私有成员和受保护成员
 */
class Private1 {
}
class Private1Child extends Private1 {
    constructor() {
        super();
    }
}
class Private2 {
}
/**
 * p1 指定为 Private1 类型，为期赋值 Private1Child 类型是可以兼容的
 * 因为 Private1Child 是继承了 Private1 的， 他们俩的实例属性是没有差别的
 */
let p1 = new Private1Child();
let g1;
let g2;
g1 = g2;
let g3;
let g4;
// g3 = g4; // error
//# sourceMappingURL=06.类型推断&&类型兼容型.js.map