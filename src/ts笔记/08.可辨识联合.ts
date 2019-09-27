// 可辨识联合

/**
 * 1. 可辨识联合|标签联合
 *  可以将枚举成员、字面量类型、联合类型、类型保护、类型别名这几种类型进行合并，创建一个可辨识联合的高级类型
 *  可辨识联合具备两个要求
 *    1. 具有普通的单例类型属性（这个要作为辨识的特征，也是重要因素）。
 *    2. 一个类型别名，包含了那些类型的联合（即把几个类型封装为联合类型，并起一个别名）。
 *
 *  所谓单例类型，你可以理解为符合 单例模式 的数据类型，比如枚举成员类型，字面量类型。
 */
interface Square {
  kind: "square"; // 这个就是具有辨识性的属性
  size: number;
}
interface Rectangle {
  kind: "rectangle"; // 这个就是具有辨识性的属性
  height: number;
  width: number;
}
interface Circle {
  kind: "circle"; // 这个就是具有辨识性的属性
  radius: number;
}

// type Shape = Square | Rectangle | Circle; // 这里使用三个接口组成一个联合类型，并赋给一个别名Shape，组成了一个可辨识联合。
// function getArea(s: Shape) {
//   switch (s.kind) {
//     case 'square':
//       return s.size * s.size;
//     case 'rectangle':
//       return s.height * s.width;
//     case 'circle':
//       return Math.PI * s.radius ** 2;
//   }
// }

// Shape 新增一个类型
interface Triangle {
  kind: "triangle";
  bottom: number;
  height: number;
}

type Shape = Square | Rectangle | Circle | Triangle; // 这里使用三个接口组成一个联合类型，并赋给一个别名Shape，组成了一个可辨识联合。
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
function assertNever(value: never): never {
  throw new Error("Unexpected object: " + value);
}
function getArea(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
    case "triangle":
      return s.bottom * s.height;
    default:
      return assertNever(s); // error 类型“Triangle”的参数不能赋给类型“never”的参数
  }
}
