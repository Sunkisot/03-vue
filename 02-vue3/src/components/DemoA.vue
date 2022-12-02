<template>
  <div>{{ param.a }}</div>
</template>

<script lang="ts" setup>
import { toRef, toRefs } from "vue";
import type { Ref } from "vue";
const props = defineProps<{
  param: {
    a: Ref<number>;
  };
}>();
const { param } = toRefs(props);
// const param = toRef(props, "param");
console.log(param);
</script>

<style></style>
