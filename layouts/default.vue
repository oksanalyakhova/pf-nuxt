<template lang="pug">
  client-only
    .app
      Nuxt
</template>

<script>
  import Component, {mixins} from 'vue-class-component';
  import sizeTricks from '@/mixins/sizeTricks';
  import deviceDetector from '@/mixins/deviceDetector';

  import '@/assets/styles/common.sass';

  @Component
  export default class Project extends mixins(sizeTricks, deviceDetector) {
    mounted() {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      this.isMobile ? document.body.classList.add('mobile') : document.body.classList.add('desktop');
    }
  }
</script>
