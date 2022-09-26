import Vue from './vue'

var vm = new Vue({
  el: '#app',
  data: {
    obj: {
      msg: 'hello world',
    },
    html: "<div>这是html</div>"
  },
  methods: {
    handleClick() {
      console.log('点击事件', this.obj = {msg: '你好世界'})
    },
    handleClick2() {
      this.obj = {msg: 'hello world'}
    }
  }
})