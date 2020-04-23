import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "popper.js";
import "bootstrap";
import "./assets/app.scss";
import VueFirestore from "vue-firestore";
Vue.use(VueFirestore, {
  key: "id",
  enumerable: true
});

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
