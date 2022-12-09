import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
// import App from "./App.tsx";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(
  {
    install(app, options) {
      // console.log(app, options);
    },
  },
  {
    a: 1,
  }
);
app.use(createPinia());
app.use(router);

app.mount("#app");
