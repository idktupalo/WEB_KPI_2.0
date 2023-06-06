<template>
  <div>
    <div v-if="showNavigation">
      <section class="navmenu" id="title">
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
              <li
                class="nav-item"
                :class="{ active: $route.path === '/profile' }"
              >
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
              <li
                class="nav-item"
                :class="{ active: $route.path === '/about' }"
              >
                <router-link to="/about">
                  <a class="nav-link">About</a>
                </router-link>
              </li>
              <li
                class="nav-item"
                :class="{ active: $route.path === '/login' }"
              >
                <router-link to="/login">
                  <a class="nav-link">Sign Up</a>
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </div>
    <router-view />
  </div>
</template>

<script>
import config from "./config.js";

export default {
  name: "App",
  beforeMount() {
    this.$store.dispatch("INIT", config.STORAGE);
  },
  computed: {
    showNavigation() {
      return this.$route.meta.navigation !== false;
    },
  },
};
</script>

<style>
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
