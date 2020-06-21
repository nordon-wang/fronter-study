/** 
 * proxy
*/

let p1 = {
  a: 1,
  b: 2
}

let p11 = new Proxy(p1, {
  get(target, key) {
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    console.log(target, key, value);
    return Reflect.set(target, key, value)
  }
})

// p11.a = 22
// console.log(p1);
// console.log(p11.a);



/** 
 * proxy 只能代理一层
*/
let p2 = {
  a: {
    a: 1
  },
  b: 1
}

const handler = {
  get(target, key) {
    // 由于 proxy只能代理一层, 若是对象, 继续代理
    if (typeof target[key] === 'object') {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    console.log('update....', target, key, value);
    return Reflect.set(target, key, value)
  }
}
let p22 = new Proxy(p2, handler)

// p22.b = 22
p22.a.a = 22
console.log(p2);

