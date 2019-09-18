/**
 * 1. 类型断言
 *  ts并不是万能的，有些情况ts也不能很好判断一个变量值的类型，此时就需要将类型检查的主动握到到自己的手中，告诉ts不需要检测了
 *  类型断言就是一个进行强类型转换的过程，把某个值强行指定为特定类型
 *  使用方式
 *  (<string>target) jsx不支持，并不建议使用
 *  (target as string) 推荐写法
 */
const getLen = (target) => {
    if (target.length) {
        return target.length;
    }
    else {
        return target.toString().length;
    }
};
function getP({ name, age, hobby }) {
    console.log(`${name} -- ${age} -- ${hobby ? hobby : ''}`);
}
const readonlyInfo = {
    name: 'nordon',
    age: 18
};
// readonlyInfo.name = 'wy'; // error
readonlyInfo.age = 22;
// 形参名 可以不一致
const totalCount = (n1, n2) => n1 + n2;
const index1 = {
    0: 'first',
    1: 'second',
    '2': 'three'
    //   sd: 'asd' // error
};
const index2 = ['first', 'second'];
const cat = {
    name: '小猫咪',
    type: 'cat',
    eat: 'fish'
};
const dog = {
    name: '旺财',
    age: 88
};
const getCounter = () => {
    // 这里定义一个函数用来返回这个计数器
    const c = () => {
        // 定义一个函数，逻辑和前面例子的一样
        c.count++;
    };
    c.count = 0; // 再给这个函数添加一个count属性初始值为0
    return c; // 最后返回这个函数对象
};
const counter = getCounter(); // 通过getCounter函数得到这个计数器
counter();
console.log(counter.count); // 1
counter();
console.log(counter.count); // 2
//# sourceMappingURL=03.类型断言&接口.js.map