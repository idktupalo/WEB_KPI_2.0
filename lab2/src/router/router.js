import { createRouter, createWebHistory } from "vue-router";
import About from "../views/AboutPage.vue";
import Application from "../views/ApplicationPage.vue";
import Index from "../views/HomePage.vue";
import Login from "../views/LoginPage.vue";
import Profile from "../views/ProfilePage.vue";
import Register from "../views/RegisterPage.vue";

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
  next();
});

export default router;
