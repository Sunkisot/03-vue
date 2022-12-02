<script lang="tsx">
import { defineComponent, h, reactive } from "vue";

export default defineComponent({
  name: "SetupA",
  setup(props, { attrs, slots, emit, expose }) {
    const state = reactive({
      a: 100,
    });
    console.log(props, attrs, slots, emit, expose);
    // 暴露公共属性
    expose({
      a: state.a,
    });

    // return () => <div>{state.a}</div>;
    return () => h("div", state.a);
  },
});
</script>
