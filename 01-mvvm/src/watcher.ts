// watcher模块负责把compile模块与observe模块关联起来

export class Watcher {
  $vm: any
  expr: string
  cb: (a: any, b: any) => void
  oldValue: any
  // vm: 当前的vue实例
  // expr: data中数据的名字
  // 一旦数据发生了改变，需要调用cb
  constructor(vm: any, expr: string,cb: (a: any, b: any) => void ) {
    this.$vm = vm
    this.expr = expr
    this.cb = cb;
    // 1. 记录watcher(存储到全局)
    (<any>Dep).target = this
    // 此处有缺陷 constructor 只在new时触发，所以此处 只能记录第一次的旧值
    // 2. 触发get 进行订阅者dep添加
    this.oldValue = this.getVMValue(vm, expr);
    // 3. 清空
    (<any>Dep).target = null
  }
  // 对外暴露一个方法 这个方法用于更新页面
  update() {
    let oldValue = this.oldValue
    let newValue = this.getVMValue(this.$vm, this.expr)
    if(newValue != oldValue) {
      this.cb(newValue, oldValue)
    }
  }
  // 获取VM中的数据
  getVMValue(vm: any, expr: string) {
    let data: any = vm.$data
    expr.split('.').forEach(key => {
      data = data[key]
    })
    return data
  }
}
// dep对象用于管理所有的订阅者和通知这些订阅者
export class Dep {
  subs: Array<any>
  constructor() {
    this.subs = []
  }
  // 添加订阅者
  addSub(watcher: any) {
    this.subs.push(watcher)
  }
  // 通知所有订阅者
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}