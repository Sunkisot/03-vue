import { Watcher } from "./watcher"

export default class Compile {
  $el: any
  $vm: any
  constructor(el: any, vm: any) {
    this.$el = typeof el == 'string' ? document.querySelector(el) : el
    this.$vm = vm

    if (this.$el) {
      // 1. 把el中的所有子节点放到内存中， fragment
      let fragment = this.nodeToFragment(this.$el)
      // 2. 在内存中编译文档碎片
      this.compile(fragment)
      // 3. 把fragment一次性添加到页面
      this.$el.appendChild(fragment)
    }
  }
  /**
   * 编译文档碎片（内存中）
   * @param fragment 
   */
  compile(fragment: any) {
    let childNodes = fragment.childNodes
    this.toArray(childNodes).forEach((node: any) => {
      // 如果是元素 节点解析指令
      if (this.isElementNode(node)) {
        this.compileElement(node)
      }
      // 如果是文本节点解析插值表达式
      if (this.isTextNode(node)) {
        this.compileText(node)
      }

      // 如果当前节点还有自节点 需递归
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }
  // 把node节点放到fragment对象中
  nodeToFragment(node: any) {
    // 把el中所有的子节点放入文档碎片中（内存）
    let fragment = document.createDocumentFragment()

    let childNodes = node.childNodes
    this.toArray(childNodes).forEach(node => {
      fragment.appendChild(node)
    })
    return fragment
  }
  // 解析 元素节点
  compileElement(node: any) {
    // 1. 获取当前元素节点的所有属性
    let attributes = node.attributes
    this.toArray(attributes).forEach((attr: any) => {
      // 2. 解析vue指令（以v-开头的属性）
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        let type = attrName.slice(2)
        let expr = attr.value
        // 解析v-on指令
        if (this.isEventDirective(type)) {
          CompileUtil['eventHandler'](node, this.$vm, expr, type)
        } else {
          CompileUtil[type] && CompileUtil[type](node, this.$vm, expr)
        }

      }
    })
  }
  // 解析 文本节点
  compileText(node: any) {
    CompileUtil.mustache(node, this.$vm)
  }




  // util 伪数组转化为数组方法
  toArray(arr: []) {
    return [].slice.call(arr)
  }
  // util 判断是否是元素节点
  isElementNode(node: any): boolean {
    return node.nodeType === 1
  }
  // util 判断是否是文本节点
  isTextNode(node: any): boolean {
    return node.nodeType === 3
  }
  // util 判断是否指令
  isDirective(attrName: string) {
    return attrName.startsWith('v-')
  }
  // util 判断是否事件指令
  isEventDirective(type: string) {
    return type.split(':')[0] === 'on'
  }

}

let CompileUtil: any = {
  // 插值表达式替换
  mustache(node: any, vm: any) {
    let txt: string = node.textContent
    let reg: RegExp = /\{\{(.+)\}\}/
    if (reg.test(txt)) {
      let expr: string = RegExp.$1
      node.textContent = txt.replace(reg, this.getVMValue(vm, expr))
    }
  },
  // 处理v-text指令
  text(node: any, vm: any, expr: string) {
    node.innerText = this.getVMValue(vm, expr);
    // 通过watcher对象，监听expr的数据的变化，一旦变化了，执行回调函数
    new Watcher(vm, expr, newVal => {
      node.innerText = newVal
    })
  },
  // 处理v-html指令
  html(node: any, vm: any, expr: string) {
    node.innerHTML = this.getVMValue(vm, expr)
    new Watcher(vm, expr, newVal => {
      node.innerHTML = newVal
    })
  },
  // 处理v-model指令
  model(node: any, vm: any, expr: string) {
    let _this = this
    node.value = this.getVMValue(vm, expr)
    node.addEventListener('input', function(this: any) {
      _this.setVMValue(vm, expr, this.value)
    })
    new Watcher(vm, expr, newVal => {
      node.value = newVal
    })
  },
  // 处理事件指令
  eventHandler(node: any, vm: any, expr: string, type: string) {
    let eventType = type.split(':')[1]
    let fn = vm.$methods && vm.$methods[expr]
    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm))
    }
  },
  // 获取VM中的数据
  getVMValue(vm: any, expr: string) {
    let data: any = vm.$data
    expr.split('.').forEach(key => {
      data = data[key]
    })
    return data
  },
  // 设置VM中的数据
  setVMValue(vm: any, expr: string, value: any) {
    console.log(value)
    let data: any = vm.$data
    let arr: Array<string> = expr.split('.')
    arr.forEach((key, index) => {
      if (index < arr.length - 1) {
        data = data[key]
      } else {
        data[key] = value
      }
    })
  }
}