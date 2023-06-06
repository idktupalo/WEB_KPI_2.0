<template>
  <div class="register-page">
    <div class="container container-register mt-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-7">
          <div class="card px-5 py-4" id="form1">
            <form @submit.prevent="handleSubmit">
              <div class="text-center mb-4">
                <h4>Register Now</h4>
              </div>
              <div class="forms-inputs mb-4">
                <span>Email</span>
                <input
                  type="text"
                  v-model="email"
                  v-bind:class="{
                    'form-control': true,
                    'is-invalid': !Validations.validEmail(email) && emailBlured,
                  }"
                  v-on:blur="emailBlured = true"
                />
                <div class="invalid-feedback">A valid email is required!</div>
              </div>
              <div class="forms-inputs mb-4">
                <span>Username</span>
                <input
                  type="text"
                  v-model="username"
                  v-bind:class="{
                    'form-control': true,
                    'is-invalid':
                      !Validations.validUsername(username) && usernameBlured,
                  }"
                  v-on:blur="usernameBlured = true"
                />
                <div class="invalid-feedback">
                  A valid username is required!
                </div>
              </div>
              <div class="forms-inputs mb-4">
                <span>Birthday</span>
                <input
                  type="date"
                  v-model="birthday"
                  v-bind:class="{
                    'form-control': true,
                    'is-invalid':
                      !Validations.validDate(birthday) && birthdayBlured,
                  }"
                  v-on:blur="birthdayBlured = true"
                />
                <div class="invalid-feedback">
                  A valid birthday is required!
                </div>
              </div>
              <div class="forms-inputs mb-4">
                <span>Sex</span>
                <div class="radio-container">
                  <div class="radio-container">
                    <input
                      type="radio"
                      id="male"
                      value="male"
                      v-model="sex"
                      @change="onChange($event)"
                    />
                    <label for="male">Male</label>
                  </div>
                  <div class="radio-container">
                    <input
                      type="radio"
                      id="female"
                      value="female"
                      v-model="sex"
                      @change="onChange($event)"
                    />
                    <label for="female">Female</label>
                  </div>
                  <div class="radio-container">
                    <input
                      type="radio"
                      id="other"
                      value="other"
                      v-model="sex"
                      @change="onChange($event)"
                    />
                    <label for="other">Other</label>
                  </div>
                </div>
                <div class="invalid-feedback">Please select your sex!</div>
              </div>
              <div class="forms-inputs mb-4">
                <span>Password</span>
                <input
                  type="password"
                  v-model="password"
                  v-bind:class="{
                    'form-control': true,
                    'is-invalid':
                      !Validations.validPassword(password) && passwordBlured,
                  }"
                  v-on:blur="passwordBlured = true"
                />
                <div class="invalid-feedback">
                  Password must be 8 characters!
                </div>
              </div>
              <div class="pt-2">
                <div class="row justify-content-center">
                  <h5>
                    Already have an account?
                    <router-link to="/login">
                      <span>
                        <a class="text-danger px-4 pt-6"> Log In!</a></span
                      >
                    </router-link>
                  </h5>
                </div>
              </div>
              <div class="mb-3">
                <button class="btn btn-dark w-100">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignupValidations from "@/components/services/SignupValidations";
// eslint-disable-next-line no-unused-vars
import Validations from "@/components/services/Validations";
import { RouterLink } from "vue-router";
export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      email: "",
      emailBlured: false,
      valid: false,
      submitted: false,
      password: "",
      passwordBlured: false,
      username: "",
      usernameBlured: false,
      birthday: "",
      birthdayBlured: false,
      sex: "",
      sexBlured: false,
      successful: false,
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    Validations() {
      return Validations;
    },
  },
  methods: {
    onChange(event) {
      this.sex = event.target.value;
    },

    mounted() {
      if (this.loggedIn) {
        this.$router.push("/profile");
      }
    },
    async handleSubmit() {
      this.valid = true;

      let validation = new SignupValidations(
        this.email,
        this.username,
        this.birthday,
        this.sex,
        this.password
      );

      this.valid = validation.checkValidations();

      if (this.valid) {
        const userData = {
          email: this.email,
          password: this.password,
          username: this.username,
          birthday: this.birthday,
          sex: this.sex,
        };

        // Save user data to local storage
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if a user with the same email already exists
        const existingUser = users.find(
          (user) => user.email === userData.email
        );
        if (existingUser) {
          alert("User with the same email already exists");
          return; // Exit the registration process
        }

        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));

        this.submitted = true; // Update the submitted property

        // Redirect to the profile page
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style>
.register-page {
  background-color: #17a2b8;
}

.container-register {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
}

.row {
  height: 100%;
  align-items: center;
}

.card {
  border: none;
  height: 100%;
}

.forms-inputs {
  position: relative;
}

.forms-inputs span {
  position: absolute;
  top: -18px;
  left: 10px;
  background-color: #fff;
  padding: 5px 10px;
  font-size: 15px;
}

.forms-inputs input {
  height: 50px;
  border: 2px solid #000;
}

.forms-inputs input:focus {
  box-shadow: none;
  outline: none;
  border: 2px solid #1c6a4a;
}

.btn {
  height: 50px;
}

.success-data {
  display: flex;
  flex-direction: column;
}

.bxs-badge-check {
  font-size: 90px;
}

.radio-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.radio-container input[type="radio"] {
  margin-right: 5px;
}
</style>
