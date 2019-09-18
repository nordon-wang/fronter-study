/**
 * 解析模板内容
 */
class Compiler {
    constructor(el, vm) {
        // el: new Vue 传递的选择器 或者 DOM 对象
        this.el = typeof el === "string" ? document.querySelector(el) : el;
        // vm: new 的 vue 实例
        this.vm = vm;
        // 编译模板
        if (this.el) {
            // 1. 把 el 中所有的子节点都放到内存中， fragment
            let fragment = this.node2fragment(this.el);
            // console.dir(fragment);
            // 2. 在内存中编译 fragment
            this.compiler(fragment);
            // 3. 把 fragment 一次性的添加到页面
            this.el.appendChild(fragment);
        }
    }
    /**
     * 核心方法 -- 和编译相关
     */
    // 将节点转换成fragment
    node2fragment(node) {
        let fragment = document.createDocumentFragment();
        // 将 el 中所有的子节点遍历的添加到文档碎片中
        let childNodes = node.childNodes;
        this.toArray(childNodes).forEach(node => {
            // 子节点添加到文档碎片中, 添加完之后 页面此时就没有任何内容了
            fragment.appendChild(node);
        });
        return fragment;
    }
    // 在内存编译文档碎片、将插值表达式和vue的指令进行编译
    compiler(fragment) {
        let childNodes = fragment.childNodes;
        this.toArray(childNodes).forEach(node => {
            /**
             * 编译子节点
             *  如果是元素，解析指令
             *  如果是文本节点，解析插值表达式
             */
            // 是元素
            if (this.isElementNode(node)) {
                this.compilerElement(node);
            }
            // 是文本节点
            if (this.isTextNode(node)) {
                this.compilerText(node);
            }
            // 如果当前节点 还有子节点 需要进行递归解析
            if (node.childNodes && node.childNodes.length > 0) {
                this.compiler(node);
            }
        });
    }
    // 解析元素节点 -- html 标签
    compilerElement(node) {
        // 1. 获取到当前节点下的所有的属性
        let attributes = node.attributes;
        // console.log('解析元素节点 -- html 标签',attributes);
        this.toArray(attributes).forEach(attr => {
            // 2. 解析 vue 的指令， v-html、v-text等
            let attrName = attr.name; // 属性名
            // 是一个指令
            if (this.isDirective(attrName)) {
                let type = attrName.slice(2);
                let expr = attr.value; // 属性值
                // v-text
                // if(type === 'text'){
                // node.textContent = this.vm.$data[expr]
                // }
                // // v-html
                // if(type === 'html'){
                //   node.innerHTML = this.vm.$data[expr]
                // }
                // // v-model
                // if(type === 'model'){
                //   node.value = this.vm.$data[expr]
                // }
                if (this.isEventDirective(type)) {
                    // 处理事件 v-on:click等
                    CompilerUtil['eventHandler'](node, this.vm, expr, type);
                }
                else {
                    // 处理解析 v-text等
                    CompilerUtil[type] && CompilerUtil[type](node, this.vm, expr);
                }
            }
        });
    }
    // 解析文本节点 -- 解析里面的插值表达式
    compilerText(node) {
        // console.log('解析文本节点 -- test', node);
        CompilerUtil.mustache(node, this.vm);
    }
    /**
     * 工具方法 -- 辅助编译的方法
     */
    // 将类数组结构 专程 数组结构
    toArray(likeArray) {
        return [].slice.call(likeArray);
    }
    // 判断是否为 元素节点
    isElementNode(node) {
        return node.nodeType === 1;
    }
    // 判断是否为 文本节点
    isTextNode(node) {
        return node.nodeType === 3;
    }
    // 判断是不是vue的指令, 以 v- 开头
    isDirective(attrName) {
        return attrName.startsWith('v-');
    }
    // 判断是否是 事件指令 
    isEventDirective(type) {
        return type.split(':')[0] === 'on';
    }
}
/**
 * 解析不同的指令解析
*/
let CompilerUtil = {
    text(node, vm, expr) {
        node.textContent = this.getVMValue(vm, expr);
        // 通过 watcher 对象，监听 expr 的数据变化，一旦发生变化，就执行 cb
        new Watcher(vm, expr, (newValue) => {
            node.textContent = newValue;
        });
    },
    html(node, vm, expr) {
        node.innerHTML = this.getVMValue(vm, expr);
        new Watcher(vm, expr, (newValue) => {
            node.innerHTML = newValue;
        });
    },
    mustache(node, vm) {
        let txt = node.textContent;
        let reg = /\{\{(.+)\}\}/;
        // 判断是否有 插值表达式 若是有 就处理
        if (reg.test(txt)) {
            // 获取插值表达式的 变量
            let expr = RegExp.$1;
            node.textContent = txt.replace(reg, CompilerUtil.getVMValue(vm, expr));
            new Watcher(vm, expr, (newValue) => {
                node.textContent = txt.replace(reg, newValue);
            });
        }
    },
    model(node, vm, expr) {
        const _this = this;
        node.value = this.getVMValue(vm, expr);
        // 实现双向数据绑定
        node.addEventListener('input', function () {
            // vm.$data[expr] = this.value
            _this.setVMValue(vm, expr, this.value);
        });
        new Watcher(vm, expr, (newValue) => {
            node.value = newValue;
        });
    },
    eventHandler(node, vm, expr, type) {
        // 给当前元素注册事件
        let eventType = type.split(':')[1];
        let fn = vm.$methods && vm.$methods[expr];
        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm));
        }
    },
    getVMValue(vm, expr) {
        let data = vm.$data; //获取data中的数据
        expr.split('.').forEach(key => {
            data = data[key];
        });
        return data;
    },
    setVMValue(vm, expr, value) {
        let data = vm.$data;
        const arr = expr.split('.');
        arr.forEach((key, index) => {
            // 如果index是最后一个 就需要设置值了
            console.log(data, index, arr.length - 1, key, value);
            if (index < arr.length - 1) {
                data = data[key];
            }
            else {
                data[key] = value;
            }
        });
    }
};
//# sourceMappingURL=compiler.js.map