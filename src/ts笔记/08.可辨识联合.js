// 可辨识联合
// 上面例子中，的 Shape 联合有四种接口，但函数的 switch 里只包含三个 case，这个时候编译器并没有提示任何错误，因为当传入函数的是类型是 Triangle 时，没有任何一个 case 符合，则不会有 return 语句执行，那么函数是默认返回 undefined。所以可以利用这个特点，结合 strictNullChecks 编译选项，可以开启 strictNullChecks，然后让函数的返回值类型为 number，那么当返回 undefined 的时候，就会报错
// function getArea(s: Shape): number {
//   switch (s.kind) {
//     case 'square':
//       return s.size * s.size;
//     case 'rectangle':
//       return s.height * s.width;
//     case 'circle':
//       return Math.PI * s.radius ** 2;
//     case 'triangle':
//       return s.bottom * s.height;
//   }
// }
// 当函数返回一个错误或者不可能有返回值的时候，返回值类型为 never。所以可以给 switch 添加一个 default 流程，当前面的 case 都不符合的时候，会执行 default 后的逻辑：
function assertNever(value) {
    throw new Error('Unexpected object: ' + value);
}
function getArea(s) {
    switch (s.kind) {
        case 'square':
            return s.size * s.size;
        case 'rectangle':
            return s.height * s.width;
        case 'circle':
            return Math.PI * Math.pow(s.radius, 2);
        case 'triangle':
            return s.bottom * s.height;
        default:
            return assertNever(s); // error 类型“Triangle”的参数不能赋给类型“never”的参数
    }
}
//# sourceMappingURL=08.可辨识联合.js.map