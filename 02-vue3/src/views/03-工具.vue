<template>
  <div>
    <h1>工具</h1>
    <DemoAVue :param="state"></DemoAVue>
  </div>
</template>

<script lang="ts" setup>
import DemoAVue from "@/components/DemoA.vue";
import {
  ref,
  reactive,
  toRef,
  isRef,
  unref,
  watchEffect,
  isProxy,
  shallowReactive,
  readonly,
  isReadonly,
  shallowReadonly,
} from "vue";

const state = ref({ a: 1001 });

// watchEffect(() => {
//   console.log(state.value.a, "源");
// });
// setInterval(() => {
//   state.value.a++;
// }, 1000);
const a = shallowReactive({ c: { d: 100 } });
const v = shallowReadonly({ a: { c: 1 } });
v.a.c = 2;
console.log(isReadonly(v.a.c));
isProxy(a.c.d);
isReadonly(a.c.d);
/**
 * toRef和toRefs
 * 1. 用于将一个响应式对象的一个属性传递给组合式函数时，在组合式函数内想要改变这个属性时使用
 * 2. toRef 基于响应式对象上个一个属性，创建一个与之对应的ref，这样改变ref就会修改源值，反之亦然
 * 3. toRefs 将源对象转换成为一个普通的对象(可用解构)，这个普通对象的每一个属性都对应源对象的属性的ref，每个单独的ref都是通过toRef创建的
 * 4. 主要用于基本数据类型做为组合函数入参做修改时不会联动的问题
 * 5. 当源对象属性不存在的时候toRef也会返回一个可用的Ref，处理可选的props格外受用，而toRefs则不会
 */
/**
 * isProxy、isReactive、isReadonly
 * 1. 检测的都是对象，传入基础数据类型一律返回false
 */
</script>

<style></style>
