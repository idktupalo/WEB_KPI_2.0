<template>
  <section id="profile">
    <div class="container">
      <div class="row">
        <div class="col-md-5 mb-3">
          <div class="card">
            <div class="card-body text-center">
              <div class="fakeimg">
                <img src="../assets/avatar.png" alt="Profile Image" />
              </div>
              <h3 class="gg_n">
                {{ activeUser ? activeUser.username : "Guest" }}
              </h3>
              <div id="g_id"></div>
              <h3>Achievements</h3>
              <hr class="d-sm-none" />
              <div class="achievement">
                <div class="row">
                  <div class="col-sm-3">
                    <i class="fa fa-trophy"></i>
                  </div>
                  <div class="col-sm-9">
                    <h5>Learned 100 Words</h5>
                    <span>Learned 100 or more words</span>
                    <div class="progress">
                      <div
                        :style="{
                          width: calculateProgress('learned', 100) + '%',
                        }"
                        class="progress-bar progress-bar-success"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3">
                    <i class="fa fa-trophy"></i>
                  </div>
                  <div class="col-sm-9">
                    <h5>Learned 1000 Words</h5>
                    <span>Learned 1000 or more words</span>
                    <div class="progress">
                      <div
                        :style="{
                          width: calculateProgress('learned', 1000) + '%',
                        }"
                        class="progress-bar progress-bar-success"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-3">
                    <i class="fa fa-trophy"></i>
                  </div>
                  <div class="col-sm-9">
                    <h5>Time to Learn</h5>
                    <span>You have over 100 words to be learned</span>
                    <div class="progress">
                      <div
                        :style="{
                          width: calculateProgress('toLearn', 100) + '%',
                        }"
                        class="progress-bar progress-bar-success"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="card mb-3">
            <div class="card-body">
              <template v-if="!isEditingAllFields">
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Full Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" id="g_name_txt">
                    {{ activeUser ? activeUser.username : "Guest" }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" id="g_email_txt">
                    {{ activeUser ? activeUser.email : "guest@example.com" }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Date of Birth</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" id="g_date">
                    {{ activeUser ? activeUser.birthday : "N/A" }}
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Gender</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" id="g_gender_txt">
                    {{ activeUser ? activeUser.sex : "N/A" }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Full Name</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" id="g_name_input">
                    <input
                      v-model="activeUser.username"
                      v-bind:class="{
                        'form-control': true,
                        'is-invalid': !Validations.validUsername(
                          activeUser.username
                        ),
                      }"
                    />
                    <div class="invalid-feedback">
                      A valid username is required!
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Email</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" id="g_email_input">
                    <input
                      v-model="activeUser.email"
                      v-bind:class="{
                        'form-control': true,
                        'is-invalid': !Validations.validEmail(activeUser.email),
                      }"
                    />
                    <div class="invalid-feedback">
                      A valid email is required!
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Date of Birth</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" id="g_date_input">
                    <input
                      v-model="activeUser.birthday"
                      v-bind:class="{
                        'form-control': true,
                        'is-invalid': !Validations.validDate(
                          activeUser.birthday
                        ),
                      }"
                    />
                    <div class="invalid-feedback">
                      A valid date is required!
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Gender</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" id="g_gender_input">
                    <input
                      v-model="activeUser.sex"
                      v-bind:class="{
                        'form-control': true,
                        'is-invalid': !Validations.validSex(activeUser.sex),
                      }"
                    />
                    <div class="invalid-feedback">
                      A valid gender is required!
                    </div>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-3">
                    <h6 class="mb-0">Password</h6>
                  </div>
                  <div class="col-sm-9 text-secondary" id="g_password_input">
                    <input
                      v-model="activeUser.password"
                      v-bind:class="{
                        'form-control': true,
                        'is-invalid': !Validations.validPassword(
                          activeUser.password
                        ),
                      }"
                    />
                    <div class="invalid-feedback">
                      A valid password is required!
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="isAuth">
                <div class="row justify-content-center mt-4">
                  <button
                    @click="editAllFields"
                    v-if="!isEditingAllFields"
                    class="btn-edit"
                  >
                    Edit
                  </button>
                  <button @click="saveAllChanges" v-else class="btn-save">
                    Save
                  </button>
                </div>
              </template>
            </div>
          </div>
          <div class="card mb-3">
            <div class="card-body">
              <h2>DESCRIPTION</h2>
              <p>
                Web app for learning, repeating, and consolidating foreign
                words.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Validations from "@/components/services/Validations";

export default {
  data() {
    return {
      activeUser: null,
      isEditingAllFields: false,
      originalUser: null,
      isError: false,
    };
  },
  mounted() {
    // Retrieve active user from localStorage
    this.activeUser = JSON.parse(localStorage.getItem("activeUser"));
  },
  computed: {
    ...mapGetters(["isAuth"]),
    Validations() {
      return Validations;
    },
  },
  methods: {
    editAllFields() {
      // Create a deep clone of the active user object to store the original user
      this.originalUser = JSON.parse(JSON.stringify(this.activeUser));
      this.isEditingAllFields = true;
    },
    saveAllChanges() {
      this.checkErrors();
      if (!this.isError)
        localStorage.setItem("activeUser", JSON.stringify(this.activeUser));
      else {
        this.activeUser = JSON.parse(JSON.stringify(this.originalUser));
        localStorage.setItem("activeUser", JSON.stringify(this.activeUser));
      }

      this.isEditingAllFields = false;
    },
    checkErrors() {
      this.isError =
        !this.Validations.validUsername(this.activeUser.username) ||
        !this.Validations.validEmail(this.activeUser.email) ||
        !this.Validations.validDate(this.activeUser.birthday) ||
        !this.Validations.validSex(this.activeUser.sex) ||
        !this.Validations.validPassword(this.activeUser.password);
    },
    calculateProgress(type, threshold) {
      const listToLearn = this.$store.getters.ListElementsGetToLearn;
      const listLearned = this.$store.getters.ListElementsGetLearned;
      let progress = 0;

      if (type === "learned") {
        const learnedWords = listLearned.length;
        progress = Math.floor((learnedWords / threshold) * 100);
      } else if (type === "toLearn") {
        const toLearnWords = listToLearn.length;
        progress = Math.floor((toLearnWords / threshold) * 100);
      }

      return progress;
    },
  },
};
</script>

<style>
#logo img {
  display: block;
  max-width: 15%;
  max-height: 15%;
  padding-left: 0;
  margin-left: 0;
}

.fakeimg img {
  height: 200px;
  background: #aaa;
}

#profile {
  background-color: #17a2b8;

  height: 100vh;
  padding-top: 100px;
}

.achievement {
  margin-top: 20px;
}

.text-center {
  text-align: center;
}

.gg_n {
  margin-top: 15px;
  margin-bottom: 15px;
}
.btn-edit,
.btn-save {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-edit {
  background-color: #17a2b8;
}

.btn-edit:hover {
  background-color: #138496;
}

.btn-save {
  background-color: #28a745;
}

.btn-save:hover {
  background-color: #218838;
}
</style>
