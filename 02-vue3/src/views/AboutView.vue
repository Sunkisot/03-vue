<template>
  <div class="about">
    <!-- <h1 class="state">{{ state.a }}</h1> -->
    <h1 ref="h1" class="state">{{ a }}</h1>
    <compOne
      ref="compOne1"
      :value="[]"
      a="123"
      class="a"
      @change="onChange"
    ></compOne>
    {{ data.foo }}
    Mouse position is at: {{ mouse.x }}, {{ mouse.y }}
    <input type="text" v-focus />
    <!-- <button @click="increment">+</button> -->
  </div>
</template>
<script setup lang="ts">
import {
  reactive,
  ref,
  nextTick,
  computed,
  watch,
  watchEffect,
  onMounted,
  unref,
  isRef,
  provide,
  inject,
} from "vue";
import compOne from "@/views/compOne.vue";
import { useMouse } from "./mouse";
import { key } from "./keys";
// const state = reactive({ a: { count: 100 } });
// const arr = reactive([1, 2]);
// async function increment() {
//   let { a } = state;
//   a.count++;
//   await nextTick();
//   arr[0] = 300;
// }

provide(key, "123");

const mouse = reactive(useMouse());
console.log(mouse.x, mouse.y);
const author = reactive({
  name: "John Doe",
  books: [
    "Vue 2 - Advanced Guide",
    "Vue 3 - Basic Guide",
    "Vue 4 - The Mystery",
  ],
});

const a = computed(() => (author.books.length > 0 ? "yes" : "no"));
console.log(a.value);
const data = {
  foo: ref(0),
};

const vFocus = (el: any) => el.focus();
// watch(author, (newVal) => {
//   console.log("变化了", newVal);
// });
// watch(
//   () => author,
//   (newVal) => {
//     console.log("变化了", newVal);
//   }
// );
// watch(
//   () => author,
//   (newVal) => {
//     console.log("变化了", newVal);
//   },
//   { deep: true }
// );

watchEffect(() => {
  console.log(author, data);
});
author.name = "1";
data.foo.value = 10;

console.log("unRef", isRef(author));

let compOne1 = ref<InstanceType<typeof compOne> | null>(null);
onMounted(() => {
  console.log(compOne1.value);
});

function onChange(value: number) {
  console.log(value);
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
