import { h, ref, defineComponent, defineCustomElement } from "vue";
import Example from "./CustomElement.ce.vue";
export default defineComponent({
  setup() {
    const a = ref("123");
    const onClick = () => {
      a.value = 456;
    };
    const ExampleElement = defineCustomElement(Example);
    customElements.define("my-example", ExampleElement);
    return {
      a,
      onClick,
    };
  },
  render() {
    return (
      <div>
        <div onClickOnce={this.onClick}>{this.a}1</div>
        <div>
          <my-example></my-example>
        </div>
      </div>
    );
  },
});
