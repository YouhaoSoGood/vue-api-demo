<template>
    <div class="toast-container position-absolute pe-3 top-0 end-0 me-3">
        <Toast v-for="(msg2, key) in messages" :key="key" :msg1="msg2" />
    </div>
</template>

<script>
import Toast from '../components/Toast';

export default {
  components: { Toast },
  data () {
    return {
      messages: []
    };
  },
  inject: ['emitter'],
  mounted () {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
    });
  }
};
</script>
