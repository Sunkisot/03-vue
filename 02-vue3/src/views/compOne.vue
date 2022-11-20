<template>
  <div @click="emit('change', 2)">
    123
    <input type="text" @change="onChange" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, withDefaults, inject } from "vue";
import { Person } from "./test.js";
import { key } from "./keys";
const a = ref(0);

console.log("inject", inject(key));
// const props = defineProps({
//   value: Person,
// });
interface Props {
  value?: number[];
}
const props = withDefaults(defineProps<Props>(), {
  value: () => [1],
});
interface fn {
  (val: string): string;
}
const fun: fn = (val) => val;

console.log(fun("1"));
const computedA = computed<[]>(() => []);

function onChange(event: Event) {
  console.log(event, (event.target as HTMLInputElement).value);
}
// const emit = defineEmits({
//   change(value) {
//     console.log(value);
//     return true;
//   },
// });
const emit = defineEmits<{
  (e: "change", a: number, c?: string): void;
}>();

console.log(props.value, emit);
emit("change", 1);

defineExpose({
  a,
});
</script>

<style></style>
