<template lang="pug">
  client-only
    .app
      Header
      Nuxt
</template>

<script>
  import Component from 'vue-class-component';
  import { Mixins } from 'vue-property-decorator';
  import Mixin from '@/mixins/global';
  import Header from '@/components/Header.vue';

  import '@/assets/styles/common.sass';

  @Component({
    components: {
      Header
    }
  })
  export default class Project extends Mixins(Mixin) {}
</script>
