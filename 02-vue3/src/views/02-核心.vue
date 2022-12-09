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

const state = ref(0);

const stop = watchEffect((clean) => {
  console.log(state, "1");
  clean(() => {
    console.log("清理副作用");
  });
});
setInterval(() => {
  stop();
}, 1000);
/**
 * ref、reactive和readonly
 * 1. setup是在created钩子之前 所有在setup中去改数据 看不出来数据是否是响应式的
 * 2. ref 是深度监听，替换value也会触发响应式，只有替换整个对象响应式才会消失
 * 3. reactive 是深度监听，替换内部所有的属性都会触发响应式，只有替换原始对象响应式才会消失
 * 4. reactive 的属性值可以是ref对象，但是会自动解包，也就是访问时按照reactive对象规范来，不需要用.value来取值(但是当访问的是个数组或Map这种原生集合类型中的ref元素时，
 *    不会自动解包，使用浅层状态(shallowReactive, shallowReadonly)时，如果内层属性是ref对象时，也是不会自动解包的)
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
 * 3. 想要监听对象上的某一个属性是，可以使用getter函数作为数据源，但回掉只在此函数的返回值发生改变时才会触发，这时可以开启deep进行深监听，但是此时返回的新旧值相同
 * 4. 如果监听一个响应式对象时，那他们newVal和oldVal是相等，如果是一个基础数据类型，那么newVal和oldVal会自动解构，并且是不相等的
 * 5. 触发逻辑 如果监听的是箭头函数形式，先看箭头函数依赖的属性是否是响应式的，在看箭头函数的返回值是否相等，然后在看副作用函数的新旧值
 */
/**
 * watchEffect
 * 1. 副作用清理函数在依赖改变后，回调函数执行前调用，或者是监听函数停止后调用(可以用来清理定时器，或者接口调用的防抖)
 * 2. watchEffect只会在同步期间追踪依赖，在使用异步回调时，只有在第一个await正常工作前被访问到的属性才会被追踪
 * 3. watchEffect内看依赖的值是否改变 改变才会触发
 */
</script>

<style></style>
