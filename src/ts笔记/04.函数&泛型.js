/**
 * 1. 为函数和函数参数定义类型
 */
//  1.1
function add1(n1, n2) {
    return n1 + n2;
}
// 1.2 add2 的函数类型 --> (n1: number) => number; 包含参数类型和返回值类型
let add2;
add2 = (n1, n2) => n1 + n2;
const add3 = (n1, n2) => n1 + n2;
// n1: number = 2 显示的指定参数的类型和默认值，若是不显示制定类型，ts 会根据默认值的类型进行判断
const add4 = (n1 = 2, n2) => n1 + n2;
function overloadFunc(params) {
    if (typeof params === 'string') {
        return params.split('');
    }
    else {
        return params
            .toString()
            .split('')
            .join('_');
    }
}
// console.log(overloadFunc(123)); // 1_2_3
// console.log(overloadFunc('123')); // ["1", "2", "3"]
/**
 * 2. 泛型
 *  在定义类、接口、函数的时，不预先指定具体的类型，而是在使用的时候再指定类型的一种特性
 */
//  没有使用泛型， 不能很好的判断value的类型
const getArr1 = (value, len = 2) => {
    return new Array(len).fill(value);
};
// getArr1([1, 2], 3).forEach(item => {
//   console.log(item.length);
// });
// getArr1(2, 4).forEach(item => {
//   console.log(item.length);
// });
/**
 * 我们在定义函数之前，使用<>符号定义了一个泛型变量 T，这个 T 在这次函数定义中就代表某一种类型，它可以是基础类型，也可以是联合类型等高级类型。
 * 定义了泛型变量之后，你在函数中任何需要指定类型的地方使用 T 都代表这一种类型。
 * 比如当我们传入 value 的类型为数值类型，那么返回的数组类型T[]就表示number[]。
 */
const getArr2 = (value, len = 2) => {
    return new Array(len).fill(value);
};
getArr2([1, 2], 3).forEach(item => {
    //   console.log(item.length); // [[1,2],[1,2],[1,2]]
});
getArr2(2, 4).forEach(item => {
    // console.log(item.length); // 因为使用了泛型， 会进行检测
});
// getArr2 <number> 不显示指定泛型的类型， ts会根据传递的数据类型进行校验
getArr2(2, 4).forEach(item => {
    //   console.log(item.length); // 因为使用了泛型， 会进行检测
});
/**
 * 2.1 泛型变量
 *  使用泛型的时候，需要把所有涉及到泛型的数据，当作任意类型来处理，就是说，不能随意的调用一个方法、操作，除非是那种任意类型都可以使用的操作和方法才可以在泛型上使用，比如length属性，number就没有这个属性
 */
function genericVarTest(params) {
    // 因为不知道泛型最终是什么类型，若是number类型，是不可以使用length属性的
    //   return params.length; // error
    return params;
}
function genericVar(param1, param2, len = 2) {
    return new Array(len).fill([param1, param2]);
}
// genericVar<number, string>(2, 'b', 4)
genericVar(1, 'a', 2).forEach(item => {
    //   console.log(item[0].length); // error
    //   console.log(item[1].length);
});
/**
 * 2.2 泛型函数类型
 */
// 普通函数
let normalFunc1;
normalFunc1 = (n1, n2) => n1 + n2;
// 普通的泛型函数
const genericVarFunc1 = (arg, len) => {
    return new Array(len).fill(arg);
};
let nf2 = (n1, n2) => n1 + n2;
let gf2 = (arg, len = 2) => {
    return new Array(len).fill(arg);
};
let nf3 = (arg, len = 2) => {
    return new Array(len).fill(arg);
};
let gf3 = (arg, len = 2) => {
    return new Array(len).fill(arg);
};
const GenericLimitFunc = (num) => {
    return num.length;
};
// GenericLimitFunc(1); // error 没有length
GenericLimitFunc([1, 2]);
GenericLimitFunc({ length: 2 }); // {} 不可以， 增加 length属性即可
/**
 * 2.3.2 约束类型参数
 */
const getType1 = (obj, propName) => obj[propName];
const getTypeObj = { a: 'aa' };
getType1(getTypeObj, 'b'); // 此时这么使用就会出现问题，可以使用索引类型 keyof 和 泛型
const getType2 = (obj, propName) => obj[propName];
// getType2(getTypeObj, 'b'); // error
//# sourceMappingURL=04.函数&泛型.js.map