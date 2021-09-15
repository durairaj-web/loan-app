import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import NewLoan from "../views/NewLoan.vue";
import Loans from "../views/Loans.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/new-loan",
    name: "NewLoan",
    component: NewLoan,
  },
  {
    path: "/loans",
    name: "Loans",
    component: Loans,
  },
];

const router = new Router({
  mode: "history",
  routes,
});

export default router;
