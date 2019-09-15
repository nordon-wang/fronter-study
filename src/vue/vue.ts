
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

    // 如果指定了 el 参数，对 el 进行解析
    if(this.$el){
      // compiler 主要用于解析模版的内容
      new Compiler(this.$el, this)

    }
  }
}