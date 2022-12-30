<template>
  <div>
    <GvSelectVue v-model="value" :data="data"></GvSelectVue>
    <a-button @click="onClick">按钮</a-button>
  </div>
</template>
<script lang="ts" setup>
import GvSelectVue from "@/components/GvSelect.vue";
import { range } from "ramda";
let arr: any[] = range(1, 1000).map((e) => ({
  key: e.toString(),
  name: e.toString(),
}));
const data = reactive(arr);
console.log(data);

const value = ref<string | string[] | number | number[]>("4");

function onClick() {
  value.value = "6";
}

watchEffect(() => {
  console.log("value:", value.value);
});
</script>
