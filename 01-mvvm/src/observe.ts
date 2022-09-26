// observer 用户给data中所有的数据添加getter 和 setter
// 方便我们在获取和设置data中的数据的时候，实现我们的逻辑
import { Dep } from './watcher'

export default class Observer {
  $data?: any
  constructor(data: any) {
    this.$data = data
    this.walk(data)
  }
  // 核心方法
  // 遍历data中所有的数据，都添加上getter和setter 
  walk(data: any) {
    if (!data || typeof data != 'object') {
      return
    }
    Object.keys(data).forEach(key => {
      // 给data对象的key设置getter和setter
      this.defineReactive(data, key, data[key])
      // 如果data[key]是一个复杂的类型，递归的walk
      this.walk(data[key])
    })
  }
  // 定义响应式的数据（数据劫持）
  defineReactive(data: any, key: string, value: any) {
    let _this = this
    let dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        (<any>Dep).target && dep.addSub((<any>Dep).target)
        return value
      },
      set(newVal) {
        if (newVal === value) return
        value = newVal
        // 如果newValue是一个对象，也应该对她进行劫持
        _this.walk(newVal);

        // (<any>window).watcher.update()
        dep.notify()
      }
    })

  }
}

