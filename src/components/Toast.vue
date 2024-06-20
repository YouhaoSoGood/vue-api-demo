<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast1">
    <div class="toast-header">
      <span :class="`bg-${msg1.style}`" class="p-2 rounded me-2 d-inline-block"></span>
      <strong class="me-auto">{{ msg1.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" v-if="msg1.content">
      {{ msg1.content }}
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  name: 'Toast',
  props: [
    'msg1'
  ],
  mounted () {
    const toastEl = this.$refs.toast1;
    const toast2 = new Toast(toastEl, {
      delay: 5000
    });
    toast2.show();
  }
}
</script>
