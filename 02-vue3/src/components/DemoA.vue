<template>
  <div>{{ state.a.b.e }}</div>
</template>

<script lang="ts" setup>
import { reactive, toRef, toRefs, watch, watchEffect } from "vue";
import type { ParamsType } from "@/types/demo";
import { useDemo } from "@/useHooks/useDemo";
const props = defineProps<{
  param: ParamsType;
}>();
const { param } = toRefs(props);
// const param = toRef(props, "param");
// watch()
const state = reactive({
  a: {
    b: {
      e: 1,
    },
  },
  c: 0,
  d: true,
});
const { a, c } = state;
console.log(a, c);
useDemo(a);
</script>

<style></style>
