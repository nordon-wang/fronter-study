class Vue {
  constructor(options){
    this.$el = document.querySelector(options.el)
    this.$data = options.data
    
    this._directive = {}
    this.Observer(this.$data)
    this.Compile(this.$el)
  }

  // 
  Observer(data) {
    for (let key in data) {
      this._directive[key] = []
      console.log(this._directive);
      
      let value = data[key]
      let watcher = this._directive[key]
      console.log(watcher);
      
      Object.defineProperty(this.$data, key, {
        get() {
          return value
        },
        set(newValue) {
          if(newValue !== value){
            value = newValue
            watcher.forEach(w => {
              w.update()
            })
          }
        }
      })
    }

  }

  Compile(el) {
    let nodes = el.children

    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i]
      if(node.children){
        this.Compile(node)
      }

      if(node.hasAttribute('v-text')){
        // 订阅
        let attrVal = node.getAttribute('v-text')
        this._directive[attrVal].push(new Watch(node, this, attrVal, 'innerHTML'))
      }

      if(node.hasAttribute('v-model')){
        let attrVal = node.getAttribute('v-model')
        this._directive[attrVal].push(new Watch(node, this, attrVal, 'value'))

        node.addEventListener('input',  () => {
          this.$data[attrVal] = node.value
        })
      }
    }
  }
}


class Watch {
  constructor(el, vm, exp, attr) {
    this.el = el
    this.vm = vm
    this.exp = exp
    this.attr = attr
    this.update()
  }

  update(){
    // div.innerHTML = this.vue.$data['msg']
    // input[value] = this.vue.$data['msg']
    this.el[this.attr] = this.vm.$data[this.exp]
  }
}