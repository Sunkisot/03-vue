<template>
  <div>
    <div id="box" @mouseleave.stop="onMouse('out', '')">
      <a-tree
        v-model="checkedKeys"
        checkable
        blockNode
        v-model:expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :selected-keys="selectedKeys"
        :tree-data="treeData"
        @expand="onExpand"
      >
        <template #title="{ title, key }">
          <div class="cl" @mouseenter.stop="onMouse('over', key)">
            {{ title }}
            <a-dropdown
              v-if="activeKey === key"
              :getPopupContainer="getPopupContainer"
            >
              <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
                Hover me <a-icon type="down" />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">1st menu item</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">2nd menu item</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">3rd menu item</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </template>
      </a-tree>
    </div>
  </div>
</template>

<script setup lang="ts">
const expandedKeys = ref(["0-0-0", "0-0-1"]);
const autoExpandParent = ref(true);
const checkedKeys = ref(["0-0-0"]);
const selectedKeys = ref([]);
const treeData = ref([
  {
    title: "0-0",
    key: "0-0",
    children: [
      {
        title: "0-0-0",
        key: "0-0-0",
        children: [
          { title: "0-0-0-0", key: "0-0-0-0" },
          { title: "0-0-0-1", key: "0-0-0-1" },
          { title: "0-0-0-2", key: "0-0-0-2" },
        ],
      },
      {
        title: "0-0-1",
        key: "0-0-1",
        children: [
          { title: "0-0-1-0", key: "0-0-1-0" },
          { title: "0-0-1-1", key: "0-0-1-1" },
          { title: "0-0-1-2", key: "0-0-1-2" },
        ],
      },
      {
        title: "0-0-2",
        key: "0-0-2",
      },
    ],
  },
  {
    title: "0-1",
    key: "0-1",
    children: [
      { title: "0-1-0-0", key: "0-1-0-0" },
      { title: "0-1-0-1", key: "0-1-0-1" },
      { title: "0-1-0-2", key: "0-1-0-2" },
    ],
  },
  {
    title: "0-2",
    key: "0-2",
  },
]);
const activeKey = ref("");

function onExpand(expandKeys: string[]) {
  expandedKeys.value = expandKeys;
  autoExpandParent.value = false;
}
function onMouse(type: string, key: string) {
  activeKey.value = type === "over" ? key : "";
}
function getPopupContainer(): HTMLElement {
  return document.getElementById("box") as HTMLElement;
}
</script>

<style scoped></style>
