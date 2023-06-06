<template>
  <div>
    <div v-if="showNavigation">
      <Navigation />
    </div>
    <router-view />
  </div>
</template>

<script>
import config from "./config.js";
import { mapGetters, mapActions } from "vuex";
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation,
  },
  beforeMount() {
    // Initialize the Vuex store with the stored authentication status
    const storedAuthStatus = localStorage.getItem("isAuth");
    if (storedAuthStatus) {
      this.setAuthStatus(JSON.parse(storedAuthStatus));
    } else {
      // If no stored value is found, set the initial authentication status
      this.setAuthStatus(false);
    }
    this.$store.dispatch("INIT", config.STORAGE);
  },
  methods: {
    ...mapActions(["setAuthStatus"]),
  },
  computed: {
    ...mapGetters(["isAuth"]),

    showNavigation() {
      return this.$route.meta.navigation !== false;
    },
  },
};
</script>

<style>
/* Your existing styles */
</style>
