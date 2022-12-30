<template>
  <div></div>
</template>
<script lang="ts" setup>
/**
 * v-memo
 * 1. 根据依赖数组的变化来控制子树是否更新，它可以跳过vNode的创建和对比
 * 2. 如果依赖数组为空，则等同于v-once，v-once === v-memo="[]"
 * 3. 可以配合v-for一起使用，从而跳过没有改变的项的差异比较，另外搭配v-for时确保两者绑定在同一元素上
 */
</script>
