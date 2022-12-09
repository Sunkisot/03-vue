<template>
  <div>
    <h1>进阶</h1>
    <input type="text" v-model="name" />
    <div>{{ name }}</div>
    <div>{{ name1 }}</div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  shallowRef,
  triggerRef,
  customRef,
  readonly,
  reactive,
  shallowReadonly,
  toRaw,
  markRaw,
} from "vue";

function debounceRef<T>(value: T, delay?: number, callback?: (val: T) => void) {
  let timer: any = null;
  return customRef((track, trigger) => {
    return {
      get(): T {
        track();
        return value;
      },
      set(newVal: T) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          value = newVal;
          callback && callback(newVal);
          trigger();
        }, delay);
      },
    };
  });
}
const name = debounceRef<string>("0", 1000, (val) => {
  console.log(val);
});
const name1 = ref("0");

const foo = markRaw({ val: 1 });

const e = readonly({
  a: { val: 2 },
  b: foo,
});

console.log(e.a, e.b);

/**
 * customRef
 * 1. 用于自定义一个ref对象，显示的配置get和set函数
 */
/**
 * markRaw
 * 1. 将一个对象标记为不可被代理
 * 2. 标记只会打在对象的根层级，内部属性对象不会有标记
 */
</script>

<style></style>
