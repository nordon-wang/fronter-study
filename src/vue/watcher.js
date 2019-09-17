/**
 * watcher 负责将 compiler 和 observer 关联
*/
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        // this 表示的就是 new Watcher(新创建的watcher)对象， 存储在 Dep.target 属性上
        Dep.target = this;
        this.oldValue = this.getVMValue(vm, expr); // 用于对比值是否发生改变
        // 清空 Dep.target
        Dep.target = null;
    }
    // 对外暴露的一个方法，用于更新页面(数据)
    update() {
        // 对比 expr 是否发生改变，若是发生了改变，需要调用 cb
        let oldValue = this.oldValue;
        let newValue = this.getVMValue(this.vm, this.expr);
        if (oldValue !== newValue) {
            this.cb(newValue, oldValue);
        }
    }
    // 用于获取VM中的数据
    getVMValue(vm, expr) {
        let data = vm.$data; //获取data中的数据
        expr.split('.').forEach(key => {
            data = data[key];
        });
        return data;
    }
}
/**
 *  dep 用于管理所有的订阅者和通知这些订阅者
*/
class Dep {
    constructor() {
        this.subs = []; // 用于管理 订阅者
    }
    // 添加订阅者
    addSub(watcher) {
        this.subs.push(watcher);
    }
    // 发布消息
    notify() {
        // 便利所有的订阅者，调用 watcher 的 update 方法
        this.subs.forEach(sub => {
            sub.update();
        });
    }
}
//# sourceMappingURL=watcher.js.map