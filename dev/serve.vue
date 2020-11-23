<script>
import Vue from 'vue';
import TailToast from '@/TailToast.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    TailToast
  }
});
</script>

<template>
  <div id="app">
    <TailToast />
  </div>
</template>
