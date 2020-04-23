import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "popper.js";
import "bootstrap";
import "./assets/app.scss";
// jQuery gymnastics
// import jQuery from "jquery";
// import $ from "jquery";
// window.$ = $;
// window.jQuery = jQuery;

Vue.component("Navbar", require("./components/Navbar.vue").default);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
