var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BirdWhisperer = /** @class */ (function () {
    function BirdWhisperer(message) {
        this.chirping = message;
    }
    BirdWhisperer.prototype.chirp = function () {
        return 'Ah~ oh~ ' + this.chirping;
    };
    return BirdWhisperer;
}());
var birdWhisperer = new BirdWhisperer('ts的练习');
document.body.innerHTML = birdWhisperer.chirp();
/**
 * 自动拆分字符串
 */
function test(tem, name, age) {
    // console.log(tem);
    // console.log(name);
    // console.log(age);
}
var myName = 'nordon';
var myAge = function () {
    return 18;
};
test(__makeTemplateObject(["my name is ", ", my age is ", ""], ["my name is ", ", my age is ", ""
    /**
     * 参数类型
     *  有五种默认的类型
     *      string,number,boolean,void,any
     */
]), myName, myAge());
/**
 * 参数类型
 *  有五种默认的类型
 *      string,number,boolean,void,any
 */
var str1;
// str1 = 1 error 因为类型不匹配
var num = 12;
// 报错,ts会自动进行类型推断
// num = '123' 
var num2 = 123;
// 不会报错,因为any可以接受任何类型
num2 = '123123';
var type1; // 数字
var type2; // 布尔
var type3; // 字符串
// 不需要返回任何值
function type4() {
}
// 指定返回值类型为string,返回其他类型会报错
function type5() {
    return 'must be string';
}
// 方法的参数声明类型,传入的参数必须是string
function tyep6(str) {
}
// 报错 number类型
// tyep6(123) 
/**
 * 参数类型
 *     可以通过class,interface声明自定义类型
 */
var Person1 = /** @class */ (function () {
    function Person1() {
    }
    return Person1;
}());
var person1 = new Person1();
// 赋值是根据class的定义类型,若是类型不一致会报错
// person1.name = 123
person1.name = 'nordon';
person1.age = 12;
/**
 * 默认参数
 */
function defaultArgs(arg1, arg2, arg3) {
    if (arg1 === void 0) { arg1 = 18; }
    if (arg2 === void 0) { arg2 = 'norodn'; }
    if (arg3 === void 0) { arg3 = false; }
    console.log("arg1 = " + arg1 + "; arg2 = " + arg2 + "; arg3 = " + arg3);
}
// defaultArgs(11,'22',true) //arg1 = 11; arg2 = 22; arg3 = true
// defaultArgs() //arg1 = 18; arg2 = norodn; arg3 = false
/**
 * 可选参数
 *      在方法参数声明的后面用问号来标明此参数为可选参数
 *      可选参数可以不传递
 *      必填参数不能放在可选参数的后面
 */
// arg2? :string = 'norodn' 在有默认参数值的情况下,不能使用可选参数
function defaultArgs2(arg1, arg2, arg3) {
    if (arg1 === void 0) { arg1 = '18'; }
    if (arg3 === void 0) { arg3 = 'false'; }
    console.log("arg1 = " + arg1 + "; arg2 = " + arg2 + "; arg3 = " + arg3);
}
// defaultArgs2() //arg1 = 18; arg2 = undefined; arg3 = false
// defaultArgs2('11') //arg1 = 11; arg2 = undefined; arg3 = false
// defaultArgs2('1','2') //arg1 = 1; arg2 = 2; arg3 = false
// defaultArgs2('1','2','3') //arg1 = 1; arg2 = 2; arg3 = 3
/**
 * 解构多层 - 对象
 */
function getStock() {
    return {
        names: 'nordn',
        count: {
            glary: 10000,
            age: 18
        }
    };
}
var _a = getStock(), myNames = _a.names, _b = _a.count, glary = _b.glary, age = _b.age;
// console.log(myNames, glary,age); //nordn 10000 18
/**
 * 解构 - 数组
 */
var myArr1 = [11, 22, 33, 44, '55'];
var myNum1 = myArr1[0], myNum2 = myArr1[1], others = myArr1.slice(2);
// console.log(myNum1,myNum2,others); //11 22
var mynum1 = myArr1[0], mynum4 = myArr1[3];
// console.log(mynum1,mynum4); //11 44
// myArr1.desc = 'asd'
// break return 没有效果,foreach是不允许打断循环的,属性值会被忽略
myArr1.forEach(function (item) {
    // console.log(item);
    if (item == 11) {
        // console.log('return');
        return;
    }
});
//循环的是键值对中的键 
// 属性也会被遍历
for (var item in myArr1) {
    // console.log(myArr1[item]);
}
// 属性值会被忽略,循环可以被打断
for (var _i = 0, myArr1_1 = myArr1; _i < myArr1_1.length; _i++) {
    var item = myArr1_1[_i];
    // console.log(item);
}
/**
 * calss
 */
var Person3 = /** @class */ (function () {
    // 类的构造方法,只会在类初始化的时候调用一次
    // address 必须要声明的
    function Person3(address) {
        this.address = address;
        this.address = address;
    }
    Person3.prototype.say = function () {
        console.log("say..." + this.names + ",address..." + this.address);
    };
    return Person3;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child(address, num) {
        return _super.call(this, address) || this;
    }
    Child.prototype.eat = function () {
        console.log("the child num is " + this.num);
        //使用super关键字 调用父类的方法
        _super.prototype.say.call(this);
    };
    return Child;
}(Person3));
// const p1 = new Person3('安徽省...')
// p1.names = 'nordon'
// p1.say()
/**
 * 泛型
 *      参数化的类型,一般用来限制集合的内容
 */
// 只能放Person3的实例
var childArr = [];
childArr[0] = new Person3('安徽省...');
childArr[1] = new Child('安徽省...', 11);
var InterPerson = /** @class */ (function () {
    // 接口的用法,作为方法参数的类型声明
    function InterPerson(config) {
        this.config = config;
    }
    return InterPerson;
}());
// 调用时必须按照interface接口所定义的规范使用
// 传入的对象有且只能包含myname和age,多一个或者少一个都不可以
var interP = new InterPerson({
    myname: 'nordon',
    age: 18
});
var Sheep = /** @class */ (function () {
    function Sheep() {
    }
    Sheep.prototype.eat = function () {
        console.log('必须实现interface中的方法');
    };
    return Sheep;
}());
var Tiger = /** @class */ (function () {
    function Tiger() {
    }
    Tiger.prototype.eat = function () {
        console.log('必须实现interface中的方法');
    };
    return Tiger;
}());
/**
 * 注解
 *      注解为程序的元素(类,方法,变量)加上更直观明了的说明
 *      这些说明信息与程序的业务逻辑无关,而是供指定的工具或者框架使用
 */
/**
 * 类型定义文件
 *      用来帮助开发者在ts中使用已有的js库或工具包,eg:jq
 */ 
//# sourceMappingURL=exp1.js.map