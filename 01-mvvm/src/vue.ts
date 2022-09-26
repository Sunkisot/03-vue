import Compile from './compile'
import Observer from './observe'

interface options {
  el?: string
  data?: any
  methods?: any
  [propName: string]: any
}

export default class Vue {
  $el?: string
  $data: any
  $methods?: any
  constructor(options: options = {}) {
    this.$el = options.el
    this.$data = options.data
    this.$methods = options.methods

    this.proxy(this.$data)
    this.proxy(this.$methods)
    
    new Observer(this.$data)
    if (this.$el) {
      new Compile(this.$el, this)
    }
  }
  // 代理数据到vm
  proxy(data: any) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get() {
          return data[key]
        },
        set(newVal) {
          if(data[key] == newVal) return
          data[key] = newVal
        }
      })
    })
  }
}


// 1.首先实现一个compiler模版解析器，能够对模版中指令和差值表达式进行解析并赋予不同的操作
// 2.然后实现一个observer数据监听器，能够对数据对象的所有属性进行监听
// 3.然后实现一个watcher观察者，将complier解析的结果与observer所观察的对象建立联系，在observer观察到的数据对象发生变化时，接受通知，同时更新DOM，
// 4.最后创建一个公共入口对象接受初始化配置，并协调上边三个模块，也就是vue