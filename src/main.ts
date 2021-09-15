import Vue from "vue";
import { VuejsDatatableFactory } from "vuejs-datatable";
import { BootstrapVue } from "bootstrap-vue";
import money from "@titou10/v-money";
import VueToast from "vue-toast-notification";
import VeeValidate from "vee-validate";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css-minified/theme.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(VuejsDatatableFactory);
Vue.use(money, { precision: 2, prefix: "S$ " });
Vue.use(VueToast);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
