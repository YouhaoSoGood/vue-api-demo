<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">範例作品</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!-- <a class="nav-link active" aria-current="page" href="#/dashboard/products">產品</a> -->
            <router-link to="/dashboard/products" class="nav-link active">產品</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/order" class="nav-link active">訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/coupon" class="nav-link active">優惠券</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
// NavBar.vue是用來展示前端最上方的畫面
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`;
      // console.log(api);
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          this.$router.push('/login')
        }
      });
    }
  }
};
</script>
