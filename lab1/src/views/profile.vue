<!-- eslint-disable vue/multi-word-component-names -->
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
              <h3 class="gg_n">John Doe</h3>
              <div id="g_id"></div>
              <h3>Achievements</h3>
              <hr class="d-sm-none" />
              <div class="achievement">
                <div class="row">
                  <div class="col-sm-3">
                    <i class="fa fa-trophy"></i>
                  </div>
                  <div class="col-sm-9">
                    <h5>Achievement Title</h5>
                    <span>Description</span>
                    <div class="progress">
                      <div
                        data-percentage="0%"
                        class="progress-bar progress-bar-success"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Repeat the above achievement structure as needed -->
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Full Name</h6>
                </div>
                <div class="col-sm-9 text-secondary" id="g_name">John Doe</div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Email</h6>
                </div>
                <div class="col-sm-9 text-secondary" id="g_email">
                  fip@jukmuh.al
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Date of Birth</h6>
                </div>
                <div class="col-sm-9 text-secondary" id="g_date">
                  01.01.1990
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-3">
                  <h6 class="mb-0">Gender</h6>
                </div>
                <div class="col-sm-9 text-secondary" id="g_gender">Male</div>
              </div>
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
</style>
