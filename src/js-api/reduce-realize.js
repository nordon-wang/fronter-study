Array.prototype.reduce = Array.prototype.reduce || function(func, initialValue) {
  var arr = this
  var base = typeof initialValue === 'undefined' ? arr[0] : initialValue
  var startPoint = typeof initialValue === 'undefined' ? 1 : 0
  arr.slice(startPoint)
      .forEach(function(val, index) {
          base = func(base, val, index + startPoint, arr)
      })
  return base
}

