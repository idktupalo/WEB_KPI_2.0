<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header id="headnav" class="d-flex flex-column justify-content-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-8 text-center">
          <h1 class="text-light display-4 welcome-txt">
            Faraway - start productive learning and be far away from your old
            self.
          </h1>
          <h2 class="text-light lead">Enjoy your studying</h2>
          <div class="btn-container-wrapper p-relative d-block zindex-1">
            <router-link to="/application">
              <a
                class="btn btn-link btn-lg mt-md-3 mb-4 scroll align-self-center text-light"
                href="app.html"
              >
                <i class="fa fa-angle-down fa-4x text-light"></i>
              </a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style>
header#headnav {
  background-image: url("../assets/home_back.jpg");
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
}

.text-light {
  color: #fff;
}

.btn-container-wrapper {
  text-align: center;
}
</style>
