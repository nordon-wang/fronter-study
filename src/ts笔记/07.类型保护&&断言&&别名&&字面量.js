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
if (value1.length) {
    console.log(value1.length);
}
else {
    console.log(value1.toFixed(2));
}
/**
 * 1.2 利用 typeof 解决
 *  ts 中使用 typeof 有些要求
 *    a: 只能使用 === 或 !== 两种形式进行比较, 可以使用 typeof === 'string', 不能 (typeof val).includes('string)
 *    b: type 把 number, string, boolean, symbol 四种类型视为 保护类型， 例如 typeof obj === 'object'， ts 只会将其视为js语句，不具有保护类型的作用
 */
if (typeof value1 === 'string') {
    console.log(value1.length);
}
else {
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
}
else {
    console.log(obj1.getHours());
}
/**
 * 1.4 自定义类型保护
 */
function isStr(val) {
    return typeof val === 'string';
}
if (isStr(value1)) {
    console.log(value1.length);
}
else {
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
let showVar2 = 'showVar2';
showVar2 = null;
// showVar2 = undefined; // error, ts是将 null 和 undefined 区分的，number|null 和 number|undefined 是不一样的
/**
 * 2.2 可选参数&可选属性
 *  如果配置开启 strictNullChecks 之后，可选参数和可选属性会自动加上 | undefined
 */
//  n2 的类型是联合类型 number|undefined
const selectVar = (n1, n2) => { };
selectVar(1, undefined);
let selectVarInterface = {
    name: 'nordon',
    age: undefined
    // age: null // error
};
let pt = {
    x: 1,
    y: 2
    // y: '2' //  error
};
let pt2 = {
    x: '1px',
    y: '2px'
    // y: 2 // error
};
let cs = {
    name: '一级',
    citeSelf: {
        name: '二级',
        citeSelf: {
            name: '三级'
            // citeSelf: 'error' // error 因为 类型不对
        }
    }
};
let cs3 = {
    name: 'CiteSelf3'
};
let dt1 = {
    name: 'diffType'
};
cs3 = dt1;
const getDirection = (direction) => {
    return direction.slice(0);
};
// getDirection('test'); // error test 不在 定义好的几个里面
getDirection('right');
let info1 = {
    name: 'nordon',
    age: 18
    // age: 22 // error age 只能是 18
};
//# sourceMappingURL=07.类型保护&&断言&&别名&&字面量.js.map