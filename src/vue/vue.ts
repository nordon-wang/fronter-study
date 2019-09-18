
/** 
 * Vue 类 用于构造实例
*/
// import Compiler from './compiler.js'

class Vue {
  public $el
  public $data
  public $methods

  constructor(options) {
    // 给 vue 实例增加属性
    const { el, data, methods }  = options
    this.$el = el
    this.$data = data
    this.$methods = methods

    // 监视 data 中的数据
    new Observer(this.$data)

    this.proxy(this.$data)
    this.proxy(this.$methods)

    // 如果指定了 el 参数，对 el 进行解析
    if(this.$el){
      // compiler 主要用于解析模版的内容
      new Compiler(this.$el, this)
    }
  }

  // 将vm中的 data、methods等数据 都代理到了 vm 上
  proxy(data){
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get(){
          return data[key]
        },
        set(newValue){
          if(data[key] === newValue){
            return false
          }

          data[key] = newValue
        }
      })
    })
  }
}


/** 
 * test
*/
let od = {
  name: "ls"
}

let tem = od.name
Object.defineProperty(od, 'name', {
  configurable:true,
  enumerable: true,
  get(){
    console.log('get');
    return tem
  },
  set (value){
    console.log('set');
    tem = value
  }
})

// od.name = 'a'
// console.log(od.name);

