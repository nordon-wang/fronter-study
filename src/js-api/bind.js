
Function.prototype._bind = function (context) {
  var me = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var F = function () {};
  F.prototype = this.prototype;
  var bound = function () {
      var innerArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(innerArgs);
      console.log(this, this instanceof F);
      
      return me.apply(this instanceof F ? this : context || this, finalArgs);
  }
  bound.prototype = new F();
  return bound;
}

const obj = {
  name: 'obj name'
}


function getName(a,b) {
console.log(this.name, a, b);
}

// getName._bind(obj)(1,2)
let fn = getName._bind(obj)
new fn()
