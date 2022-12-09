import { watchEffect } from "vue";

export function useDemo(props) {
  props.b.e = 100;
  // props.b.e = 100;
  // watchEffect(() => {
  //   console.log(prop.a, "组合函数");
  // });
}
