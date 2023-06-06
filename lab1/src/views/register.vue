<!-- eslint-disable vue/multi-word-component-names -->
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
                    'is-invalid': !validEmail(email) && emailBlured,
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
                    'is-invalid': !validUsername(username) && usernameBlured,
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
                    'is-invalid': !validDate(birthday) && birthdayBlured,
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
                    'is-invalid': !validPassword(password) && passwordBlured,
                  }"
                  v-on:blur="passwordBlured = true"
                />
                <div class="invalid-feedback">
                  Password must be 8 character!
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
  >
</template>

<script>
// import { dataRegister } from "../components/backend_profile/profile.js";
import { mapActions } from "vuex";
import { SIGNUP_ACTION } from "../store/storeconstants";
import axios from "axios";

export default {
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
  methods: {
    ...mapActions("auth", {
      signup: SIGNUP_ACTION,
    }),
    onChange(event) {
      this.sex = event.target.value;
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    },
    mounted() {
      if (this.loggedIn) {
        this.$router.push("/profile");
      }
    },
    validate: function () {
      this.emailBlured = true;
      this.passwordBlured = true;
      this.usernameBlured = true;
      this.phoneBlured = true;
      // console.log(this.validEmail(this.email));
      // console.log(this.validUsername(this.username));
      // console.log(this.validDate(this.birthday));
      // console.log(this.validSex(this.sex));
      // console.log(this.password);
      // console.log(this.validPassword(this.password));

      if (
        this.validEmail(this.email) &&
        this.validPassword(this.password) &&
        this.validDate(this.birthday) &&
        this.validSex(this.sex) &&
        this.validUsername(this.username)
      ) {
        this.valid = true;
      }
    },

    validEmail: function (email) {
      var re = /(.+)@(.+){2,}\.(.+){2,}/;
      if (re.test(email.toLowerCase())) {
        return true;
      }
      return false;
    },

    validPassword: function (password) {
      if (password.length > 7) {
        return true;
      }
      return false;
    },

    validUsername: function (username) {
      if (username && !/\s/.test(username)) {
        return true;
      }
      return false;
    },

    validDate: function (birthday) {
      const currentDate = new Date();
      const enteredDate = new Date(birthday);
      if (isNaN(enteredDate.getTime()) || enteredDate > currentDate)
        return false;
      return true;
    },

    validSex: function (gender) {
      return !!gender;
    },
    async checkURL(url) {
      try {
        const response = await axios.head(url);
        if (response.status === 200) {
          console.log("URL is valid and accessible.");
        } else {
          console.log("URL is not accessible. Status code:", response.status);
        }
      } catch (error) {
        console.log("URL is not accessible. Error:", error.message);
      }
    },
    async handleSubmit() {
      console.log("Register");
      // this.validate();
      this.valid = true;
      if (this.valid) {
        // //signup registration
        // try {
        //   await this.signup({
        //     email: this.email,
        //     password: this.password,
        //     username: this.username,
        //     birthday: this.birthday,
        //     sex: this.sex,
        //   });
        // } catch (error) {
        //   this.error = error;
        // }

        const data = {
          email: this.email,
          password: this.password,
          username: this.username,
          birthday: this.birthday,
          sex: this.sex,
        };

        console.log(data);

        this.checkURL("http://192.168.1.102:3000");
        // this.checkURL("http://localhost:3000");

        axios
          .post("http://192.168.1.102:3000", data)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
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
