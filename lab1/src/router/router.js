import { createRouter, createWebHistory } from "vue-router";
import About from "../views/about.vue";
import Application from "../views/application.vue";
import Index from "../views/index.vue";
import Login from "../views/login.vue";
import Profile from "../views/profile.vue";
import Register from "../views/register.vue";
import { IS_USER_AUTHENTICATE_GETTER } from "../store/storeconstants";
import store from "../store/store";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    meta: {
      authenticator: false,
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      authenticator: false,
    },
  },
  {
    path: "/application",
    name: "Application",
    component: Application,
    meta: {
      authenticator: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      navigation: false,
      authenticator: false,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      authenticator: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { navigation: false },
  },
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    "auth" in to.meta &&
    to.meta.auth &&
    store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
  ) {
    next("/login");
  } else if (
    "auth" in to.meta &&
    !to.meta.auth &&
    store.getters[`auth/${IS_USER_AUTHENTICATE_GETTER}`]
  ) {
    next("/posts");
  } else {
    next();
  }
});

export default router;
