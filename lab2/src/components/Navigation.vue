<template>
  <div class="navmenu" id="title">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand">FarWise</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor02">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" :class="{ active: $route.path === '/' }">
            <router-link to="/">
              <a class="nav-link"
                >HOME <span class="sr-only">(current)</span></a
              >
            </router-link>
          </li>
          <li class="nav-item" :class="{ active: $route.path === '/profile' }">
            <router-link to="/profile">
              <a class="nav-link">Profile</a>
            </router-link>
          </li>
          <li
            class="nav-item"
            :class="{ active: $route.path === '/application' }"
          >
            <router-link to="/application">
              <a class="nav-link">App</a>
            </router-link>
          </li>
          <li class="nav-item" :class="{ active: $route.path === '/about' }">
            <router-link to="/about">
              <a class="nav-link">About</a>
            </router-link>
          </li>
          <li
            class="nav-item"
            :class="{ active: $route.path === '/login' }"
            v-on:click="changeAuthMod"
          >
            <router-link to="/login">
              <a class="nav-link">{{ this.isAuth ? "Sign Out" : "Sign in" }}</a>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Navigation",
  methods: {
    ...mapActions(["setAuthStatus"]),

    changeAuthMod() {
      console.log("Change mod");
      const newAuthStatus = !this.isAuth;
      // Update the authentication status in the Vuex store
      this.setAuthStatus(newAuthStatus);
      // Store the authentication status in local storage
      localStorage.setItem("isAuth", JSON.stringify(newAuthStatus));
    },
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
};
</script>

<style scoped>
.navmenu {
  background-color: #333;
  padding: 10px;
}

.navbar-brand {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.navbar-toggler {
  border-color: transparent;
}

.navbar-nav {
  margin-left: auto;
}

.nav-item {
  margin-right: 10px;
}

.nav-link {
  color: #fff;
  font-size: 18px;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #f8f9fa;
  text-decoration: none;
}

.nav-link.active {
  font-weight: bold;
  text-decoration: none;
}

.sr-only {
  display: none;
}

/* Add the following styles to highlight the active link */
.nav-item.active .nav-link {
  color: #f8f9fa;
  font-weight: bold;
}
</style>
