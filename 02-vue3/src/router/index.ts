import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/setup",
      name: "setup",
      component: () => import("../views/01-setup.vue"),
    },
    {
      path: "/core",
      name: "core",
      component: () => import("../views/02-核心.vue"),
    },
    {
      path: "/util",
      name: "util",
      component: () => import("../views/03-工具.vue"),
    },
    {
      path: "/senior",
      name: "senior",
      component: () => import("../views/04-进阶.vue"),
    },
    {
      path: "/directive",
      name: "directive",
      component: () => import("../views/05-指令.vue"),
    },
    {
      path: "/script",
      name: "script",
      component: () => import("../views/06-script.vue"),
    },
    {
      path: "/gvSelect",
      name: "GvSelect",
      component: () => import("../views/gvSelect.vue"),
    },
    {
      path: "/gvTree",
      name: "GvTree",
      component: () => import("../views/gvTree.vue"),
    },
  ],
});

export default router;
