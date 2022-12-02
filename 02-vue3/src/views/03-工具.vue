<template>
  <div>
    <h1>工具</h1>
    <DemoAVue :param="param"></DemoAVue>
  </div>
</template>

<script lang="ts" setup>
import DemoAVue from "@/components/DemoA.vue";
import { ref, reactive, toRef } from "vue";
// 1 toRefs
const param = {
  a: ref<number>(100),
};

setInterval(() => {
  param.a.value = Math.random();
}, 1000);
// 2 toRef
const state: {
  b?: string;
} = reactive({});
const bRef = toRef(state, "b");
bRef.value = "1234";
console.log(state.b);
</script>

<style></style>
