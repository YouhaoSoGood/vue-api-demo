<template>
<Navbar></Navbar>

<!-- <div class="container-fluid"> //此為bootstrap的一個class 可以距離邊邊有一小段距離
    <router-view/>
    <ToastMessages></ToastMessages>
</div> -->
<div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
</div>
</template>

<script>
import Navbar from '../components/NavBar.vue';
import emitter from '../methos/emitter.js';
import ToastMessages from '../components/ToastMessages.vue';

export default {
  components: {
    Navbar,
    ToastMessages
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // console.log(token);
    this.$http.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    // console.log(api);
    this.$http.post(api, this.user).then((res) => {
    //   console.log(res);
      if (!res.data.success) {
        this.$router.push('/login')
      }
    });
  },
  provide () {
    return {
      emitter
    }
  }
};
</script>
