<template>
  <div class="login-page">
    <div
      class="bg-info vh-100 d-flex align-items-center justify-content-center"
    >
      <!-- Container containing all contents -->
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <!-- White Container -->
            <div class="container bg-white rounded mt-2 mb-2 px-0">
              <!-- Main Heading -->
              <div class="row justify-content-center align-items-center pt-3">
                <h1><strong>Login</strong></h1>
              </div>

              <div class="pt-3 pb-3">
                <form class="form-horizontal">
                  <!-- User Name Input -->
                  <div class="form-group row justify-content-center px-3">
                    <div class="col-9 px-0">
                      <input
                        type="text"
                        placeholder="Email"
                        class="form-control border-info placeicon"
                        v-model="email"
                      />
                    </div>
                  </div>

                  <!-- Password Input -->
                  <div class="form-group row justify-content-center px-3">
                    <div class="col-9 px-0">
                      <input
                        type="password"
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        class="form-control border-info placeicon"
                        v-model="password"
                      />
                      <h4 v-if="invalidLogin" class="text-danger">
                        Invalid login or password
                      </h4>
                    </div>
                  </div>

                  <!-- Log in Button -->
                  <div class="form-group row justify-content-center">
                    <div class="col-6 px-3 text-center">
                      <button
                        type="button"
                        value="Log in"
                        class="btn btn-block btn-info"
                        @click="login"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                  <div class="form-group row justify-content-center">
                    <div class="col-6 px-3 text-center">
                      <router-link to="/">
                        <input
                          type="submit"
                          value="Log as a guest"
                          class="btn btn-block btn-info"
                          @click="loginGuest"
                        />
                      </router-link>
                    </div>
                  </div>
                </form>
              </div>

              <!-- Horizontal Line -->
              <div class="px-4 pt-2">
                <hr />
              </div>

              <!-- Register Now -->
              <div class="pt-2">
                <div class="row justify-content-center">
                  <h5>
                    <span class="account-text"> Don't have an Account? </span>
                    <router-link to="/register">
                      <span>
                        <a class="text-danger px-4 pt-6">
                          Register Now!</a
                        ></span
                      >
                    </router-link>
                  </h5>
                </div>
              </div>
              <!-- Horizontal Line -->
              <div class="px-4 pt-2">
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Validations from "@/components/services/Validations";
import { RouterLink } from "vue-router";
export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      email: "",
      password: "",
      invalidLogin: false,
      returnUrl: "",
      loading: false,
    };
  },
  methods: {
    ...mapActions(["setAuthStatus"]),
    login() {
      let loginUser = {
        email: this.email,
        password: this.password,
      };

      if (
        !Validations.validPassword(this.password) ||
        !Validations.validEmail(this.email)
      ) {
        this.invalidLogin = true;
      }

      // Retrieve user data from local storage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Find user with matching email and password
      const user = users.find(
        (user) =>
          user.email === loginUser.email && user.password === loginUser.password
      );

      if (user) {
        // Update the isAuth value in the Vuex store
        this.setAuthStatus(true);
        localStorage.setItem("isAuth", JSON.stringify(true));

        // Store the active user in localStorage
        localStorage.setItem("activeUser", JSON.stringify(user));

        // User found, redirect to the profile page
        this.$router.push("/");
      } else {
        // User not found, display error message
        // alert("Invalid email or password");
        this.invalidLogin = true;
      }
    },
    loginGuest() {
      // Update the isAuth value in the Vuex store
      this.setAuthStatus(false);
      localStorage.setItem("isAuth", JSON.stringify(false));
      // Remove the active user from localStorage
      localStorage.removeItem("activeUser");
    },
  },
};
</script>
<style>
.login-page {
  background-color: #17a2b8; /* Change to your desired warm color */
}

.account-text {
  margin-left: 10px;
}
.vh-100 {
  height: 100vh;
}

.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.justify-content-center {
  justify-content: center;
}
</style>
