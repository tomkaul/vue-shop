import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { fb } from "./firebase";
import "popper.js";
import "bootstrap";
import "./assets/app.scss";
// import { firestorePlugin } from "vuefire";
// Vue.use(firestorePlugin, {
//   key: "id",
//   enumerable: true
// });
import VueFirestore from "vue-firestore";
Vue.use(VueFirestore, {
  key: "id",
  enumerable: true
});

import Swal from "sweetalert2";
window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});
window.Toast = Toast;

Vue.component("Navbar", require("./components/Navbar.vue").default);

Vue.config.productionTip = false;

let app = "";
// eslint-disable-next-line no-unused-vars
fb.auth().onAuthStateChanged(user => {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
