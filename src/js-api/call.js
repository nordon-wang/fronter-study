Function.prototype._call = function (content, ...args) {
  const key = Symbol('key')
  content[key] = this
  const res = content[key](...args)
  delete content[key]
  return res
}

let obj = {
  name: 'name'
}

function getName (a,b,c) {
  console.log(this.name, a,b,c);
}

getName._call(obj, 1,2,3)