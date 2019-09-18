/** 
 * observer 用于给 data 中的所有数据添加 getter、setter
 * 方便在获取数据或设置 data 中的数据的时候，实现对应的逻辑
*/

class  Observer {
  public data;

  constructor(data) {
    this.data = data
    this.walk(data)
    // console.log('observer', data);
  }

  /** 
   * 核心方法
  */

  // 遍历 data 中的所有数据，都添加上 getter、setter 方法
  walk(data){
    if(!data || typeof data !== 'object') {
      return false
    }

    Object.keys(data).forEach(key => {
      // 数据劫持 设置 getter、setter
      this.defineReactive(data, key, data[key])
      // 如果是复杂数据 递归进行数据劫持
      this.walk(data[key])
    })
  }

  // 定义响应式的数据 -- 数据劫持
  defineReactive(data, key, value){
    let _this = this
    let dep = new Dep()

    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get(){
        // 如果 Dep.target 中有watcher对象，说明其是一个订阅者，将其存储到订阅者数组中
        Dep.target && dep.addSub(Dep.target)
        // console.log('获取数据');
        return value
      },
      set(newValue){
        if(value === newValue){
          return false
        }
        // console.log('设置数据');
        value = newValue
        // 如果 newValue 是一个对象 也应该对其进行数据劫持
        typeof newValue === 'object' && _this.walk(newValue)

        // 执行所有方法
        dep.notify()
      }
    })
  }

}