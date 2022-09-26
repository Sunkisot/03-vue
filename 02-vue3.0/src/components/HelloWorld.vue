<template>
  <div v-for="item in 10" :key="item" :ref="setItemRef">
    {{item}}
  </div>
  <div>{{title}}</div>
</template>

<script>
import { defineComponent,onMounted } from 'vue'
export default defineComponent({
  data() {
    return {
      title: 'ceshi',
    }
  },
  created() {
    console.log(this.title)
  },
  setup() {
    let itemRefs = [];
    const setItemRef = el => {
      if (el) {
        itemRefs.push(el)
      }
    }
    onMounted(() => {
      console.log('结合组合式 API:',itemRefs);
    })
    return {
      setItemRef
    }
  }
})
</script>
