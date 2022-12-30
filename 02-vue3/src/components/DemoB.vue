<template>
  <div>
    <slot></slot>
    <div class="content" @click="onClick">123</div>
  </div>
</template>
<script lang="ts" setup>
import { useSlots, useAttrs, reactive } from "vue";

const slots = useSlots();
const attrs = useAttrs();
console.log(slots, attrs);

const state = reactive({
  a: {
    b: "red",
  },
});

function onClick() {
  state.a.b = "blue";
}
</script>

<style scoped>
:slotted(.title) {
  font-size: 30px;
  color: red;
}
.content {
  color: v-bind("state.a.b");
}
</style>
