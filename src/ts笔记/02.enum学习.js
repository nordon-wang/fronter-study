// enum 深入学习
/**
 * 使用枚举，可以给一组难以理解的常量赋予一组更有意义、直观的名字
 * 枚举就是一个字典
 * ts支持 数字和字符串的枚举
 */
/**
 * 数字枚举
 *  只有数字枚举定义值时，可以使用常量或计算值，注意⚠️：若是字段值使用了常量或者计算值，紧接着其后面的相邻字段必须设置初始值，因为其不能使用默认值递增了
 */
//  START设置了默认值，PENDING 会自动在 START 的基础上进行递增
var numEnum1;
(function (numEnum1) {
    numEnum1[numEnum1["START"] = 1] = "START";
    numEnum1[numEnum1["PENDING"] = 2] = "PENDING";
    numEnum1[numEnum1["END"] = 3] = "END";
})(numEnum1 || (numEnum1 = {}));
// 由于 START 使用了计算值或常量，其后面的 PENDING必须初始化
const getStart = () => 2;
const START_NUM = 2;
var numEnum2;
(function (numEnum2) {
    //   START = getStart(),
    numEnum2[numEnum2["START"] = START_NUM] = "START";
    //   PENDING = 1, // 若是 PENDING 的初始化值比 getStart返回值小 会出现问题， {1: "PENDING", 2: "END", START: 2, PENDING: 1, END: 2}
    numEnum2[numEnum2["PENDING"] = 12] = "PENDING";
    numEnum2[numEnum2["END"] = 13] = "END";
})(numEnum2 || (numEnum2 = {}));
// 反向映射， 紧数字枚举支持，就是一个枚举的对象，可以通过其编号的枚举值进行访问
// console.log(numEnum2[12]); // PENDING
/**
 * 字符串枚举
 *  要求每个字段的值都是字符串或者该枚举中另一个字符串枚举成员
 */
var strEnum1;
(function (strEnum1) {
    strEnum1["ERR"] = "err msg";
    strEnum1["SERVER_ERR"] = "err msg";
    strEnum1["CLIENT_ERR"] = "err msg";
})(strEnum1 || (strEnum1 = {}));
// console.log(strEnum1.ERR); // 'err msg'
// console.log(strEnum1.SERVER_ERR); // 'err msg'
/**
 * 异构枚举
 *  枚举值中成员值既有字符串类型 也有 数字类型
 *  严重不建议使用，枚举的值往往是代表某一种行为或者定义某一类的集合，
 */
var enum1;
(function (enum1) {
    enum1[enum1["NUM"] = 1] = "NUM";
    enum1["STR"] = "string";
})(enum1 || (enum1 = {}));
/**
 * 枚举成员类型
 */
var Animal;
(function (Animal) {
    Animal[Animal["DOG"] = 1] = "DOG";
    Animal[Animal["CAT"] = 2] = "CAT";
})(Animal || (Animal = {}));
let cat = {
    //   type: Animal.DOG  // 不能使用 error
    type: Animal.CAT
};
let dog = {
    type: Animal.DOG
    //   type: Animal.CAT // error
};
/**
 * 联合枚举类型
 */
var EnumP;
(function (EnumP) {
    EnumP[EnumP["FULFILLED"] = 0] = "FULFILLED";
    EnumP[EnumP["REJECTED"] = 1] = "REJECTED";
})(EnumP || (EnumP = {}));
let ep1 = {
    status: EnumP.FULFILLED
};
let ep2 = {
    status: EnumP.REJECTED
};
console.log(0 /* NAME */); // console.log(0 /* NAME */);
//# sourceMappingURL=02.enum学习.js.map