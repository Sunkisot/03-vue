<template>
  <div>
    <a-select
      v-model:value="val"
      v-select-loadmore="loadmore"
      showSearch
      :filterOption="false"
      dropdownClassName="gvSelectDropdown"
      style="width: 120px"
      @search="onSearch"
    >
      <a-select-option v-for="item in options" :key="item.key">
        {{ item.name }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script lang="ts" setup>
import type { DirectiveBinding } from "vue";
const props = defineProps<{ data: any[]; modelValue: any }>();
const emits = defineEmits<{ (e: "update:modelValue", val: any): void }>();
const { data, modelValue } = toRefs(props);

const val = computed<any>({
  get() {
    return modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});
const rangeNumber = ref(20);

const filterData = shallowRef<any[]>(data.value);
const options = computed<any[]>(() =>
  filterData.value.slice(0, rangeNumber.value)
);

const vSelectLoadmore = (el: HTMLElement, bind: DirectiveBinding) => {
  const selectDropdown = document.querySelector(
    ".gvSelectDropdown .rc-virtual-list-holder"
  );
  if (!selectDropdown) return;
  (selectDropdown as HTMLElement).onscroll = function (this: any) {
    const condition =
      this.scrollHeight - this.scrollTop - 5 <= this.clientHeight;
    if (condition) bind.value();
  };
};

function onSearch(val: string) {
  rangeNumber.value = 20;
  const selectDropdown = document.querySelector(
    ".gvSelectDropdown .rc-virtual-list-holder"
  );
  selectDropdown !== null && (selectDropdown.scrollTop = 0);
  if (!val) {
    filterData.value = data.value;
    return;
  }
  filterData.value = data.value.filter((e) => e.name.includes(val));
}

function loadmore() {
  console.log(rangeNumber.value);
  rangeNumber.value += 20;
}

watchEffect(() => {
  val.value = modelValue.value;
});
</script>
