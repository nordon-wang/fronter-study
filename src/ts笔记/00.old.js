class BirdWhisperer {
    constructor(message) {
        this.chirping = message;
    }
    chirp() {
        return "Ah~ oh~ " + this.chirping;
    }
}
let birdWhisperer = new BirdWhisperer("nordon");
document.body.innerHTML = birdWhisperer.chirp();
/**
 * 自动拆分字符串
 */
function test(tem, name, age) {
    // console.log(tem);
    // console.log(name);
    // console.log(age);
}
const myName = "nordon";
const myAge = function () {
    return 18;
};
test `my name is ${myName}, my age is ${myAge()}`;
/**
 * 参数类型
 *  有五种默认的类型
 *      string,number,boolean,void,any
 */
let str1;
// str1 = 1 error 因为类型不匹配
let num = 12;
// 报错,ts会自动进行类型推断
// num = '123'
let num2 = 123;
// 不会报错,因为any可以接受任何类型
num2 = "123123";
let type1; // 数字
let type2; // 布尔
let type3; // 字符串
// 不需要返回任何值
function type4() { }
// 指定返回值类型为string,返回其他类型会报错
function type5() {
    return "must be string";
}
// 方法的参数声明类型,传入的参数必须是string
function tyep6(str) { }
// 报错 number类型
// tyep6(123)
/**
 * 参数类型
 *     可以通过class,interface声明自定义类型
 */
class Person1 {
}
let person1 = new Person1();
// 赋值是根据class的定义类型,若是类型不一致会报错
// person1.name = 123
person1.name = "nordon";
person1.age = 12;
/**
 * 默认参数
 */
function defaultArgs(arg1 = 18, arg2 = "norodn", arg3 = false) {
    console.log(`arg1 = ${arg1}; arg2 = ${arg2}; arg3 = ${arg3}`);
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
function defaultArgs2(arg1 = "18", arg2, arg3 = "false") {
    console.log(`arg1 = ${arg1}; arg2 = ${arg2}; arg3 = ${arg3}`);
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
        names: "nordn",
        count: {
            glary: 10000,
            age: 18,
        },
    };
}
const { names: myNames, count: { glary, age }, } = getStock();
// console.log(myNames, glary,age); //nordn 10000 18
/**
 * 解构 - 数组
 */
const myArr1 = [11, 22, 33, 44, "55"];
const [myNum1, myNum2, ...others] = myArr1;
// console.log(myNum1,myNum2,others); //11 22
const [mynum1, , , mynum4] = myArr1;
// console.log(mynum1,mynum4); //11 44
// myArr1.desc = 'asd'
// break return 没有效果,foreach是不允许打断循环的,属性值会被忽略
myArr1.forEach((item) => {
    // console.log(item);
    if (item === 11) {
        // console.log('return');
        return;
    }
});
// 循环的是键值对中的键
// 属性也会被遍历
for (const item in myArr1) {
    // console.log(myArr1[item]);
}
// 属性值会被忽略,循环可以被打断
for (const item of myArr1) {
    // console.log(item);
}
/**
 * calss
 */
class Person3 {
    // 类的构造方法,只会在类初始化的时候调用一次
    // address 必须要声明的
    constructor(address) {
        this.address = address;
        this.address = address;
    }
    say() {
        console.log(`say...${this.names},address...${this.address}`);
    }
}
class Child extends Person3 {
    constructor(address, num) {
        super(address);
    }
    eat() {
        console.log(`the child num is ${this.num}`);
        // 使用super关键字 调用父类的方法
        super.say();
    }
}
// const p1 = new Person3('安徽省...')
// p1.names = 'nordon'
// p1.say()
/**
 * 泛型
 *      参数化的类型,一般用来限制集合的内容
 */
// 只能放Person3的实例
let childArr = [];
childArr[0] = new Person3("安徽省...");
childArr[1] = new Child("安徽省...", 11);
class InterPerson {
    // 接口的用法,作为方法参数的类型声明
    constructor(config) {
        this.config = config;
    }
}
// 调用时必须按照interface接口所定义的规范使用
// 传入的对象有且只能包含myname和age,多一个或者少一个都不可以
let interP = new InterPerson({
    myname: "nordon",
    age: 18,
});
class Sheep {
    eat() {
        console.log("必须实现interface中的方法");
    }
}
class Tiger {
    eat() {
        console.log("必须实现interface中的方法");
    }
}
/**
 * 模块
 */
/**
 * 注解
 *      注解为程序的元素(类,方法,变量)加上更直观明了的说明
 *      这些说明信息与程序的业务逻辑无关,而是供指定的工具或者框架使用
 */
/**
 * 类型定义文件
 *      用来帮助开发者在ts中使用已有的js库或工具包,eg:jq
 */
//# sourceMappingURL=00.old.js.map