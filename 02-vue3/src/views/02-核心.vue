<template>
  <div>
    <h1>核心</h1>
  </div>
</template>

<script lang="ts" setup>
import _ from "lodash";
import { computed, readonly, watch, watchEffect } from "vue";
import {
  ref,
  reactive,
  toRef,
  shallowRef,
  shallowReactive,
  shallowReadonly,
} from "vue";

// const state = reactive({ a: { b: 100 } });
// watch(
//   () => _.cloneDeep(state.a),
//   (newVal, oldVal) => {
//     console.log(newVal, oldVal);
//   }
// );
// state.a.b = 200;

const state = ref({
  a: ref(2),
  b: {
    c: 1,
  },
});
// console.log(state.value.a);
watch(state.value.a, () => {});

/**
 * ref、reactive和readonly
 * 1. setup是在created钩子之前 所有在setup中去改数据 看不出来数据是否是响应式的
 * 2. ref 是深度监听，替换value也会触发响应式，只有替换整个对象响应式才会消失
 * 3. reactive 是深度监听，替换内部所有的属性都会触发响应式，只有替换原始对象响应式才会消失
 * 4. reactive 的属性值可以是ref对象，但是会自动解包，也就是访问时按照reactive对象规范来，不需要用.value来取值(但是当访问的是个数组或Map这种原生集合类型中的ref元素时，不会自动解包)
 * 5. ref(obj).value == reactive(obj)
 * 6. ref代理对象与reactive代理对象区别是：ref.value 被一个新对象替换后也还是响应式的，reactive则不是
 * 7. 函数内如果有响应式的状态被改变时触发了页面刷新，那么这次刷新会在函数执行结束后触发（也就是说会这次刷新也会更新非响应式的状态）
 * 8. shallowRef 如果监听的是个对象，那么只有在整个对象被替换掉的时候才是响应式的
 * 9. shallowReactive 监听的是个对象，那么只有对象的根级属性才是响应式的
 * 10. readonly 可以接受一个响应式对象或者普通对象，返回一个只读代理，他是深层监听的，解包行为与reactive相同(它本身还是响应式的)
 * 11. shallowReadonly 它只限制根级属性不可改，深层次的是可改的
 */
/**
 * computed
 * 1. 计算属性返回一个响应式的ref对象
 * 2. computed第二个参数可以用于调试语句
 */
/**
 * watch
 * 1. vue2中data中只要显示定义对象的属性，只要更新了页面就会更新，但是watch只有开启深度监听才可以监听到
 * 2. watch的第一个参数必须是一个值的代理，或者是箭头函数返回的值，直接监听一个值是不起作用的，如果监听的是一个ref对象，会被自动解构
 * 2. watch 监听一个响应式对象时，默认是深监听的,
 * 3. 想要监听对象上的某一个属性是，可以使用getter函数返回，但是此时这个属性就不是深监听了，只有属性被替换时才会触发监听，这时如果想要深监听这个属性可以开启deep
 * 4. 如果监听一个响应式对象时，那他们newVal和oldVal是相等，如果是一个基础数据类型，那么newVal和oldVal会自动解构，并且是不相等的
 * 5. 触发逻辑 如果监听的是箭头函数形式，现在箭头函数依赖的属性是否是响应式的，在看箭头函数的返回值是否相等，然后在看副作用函数的新旧值
 */
</script>

<style></style>
