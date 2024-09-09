<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <router-link class="navbar-brand " to="/user/userCart">用戶端</router-link>
        </div>
     </nav>

    <div class="container-fluid mt-3 position-relative">
        <ToastMessages></ToastMessages>
        <router-view/>
    </div>
</template>

<script>
import emitter from '../methos/emitter.js';
import ToastMessages from '@/components/ToastMessages.vue';

export default {
  components: {
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>
