<template lang="pug">
  client-only
    .app
      Nuxt
</template>

<script>
  import Component from 'vue-class-component';
  import { Mixins } from 'vue-property-decorator';
  import Mixin from '@/mixins/global';

  import '@/assets/styles/common.sass';

  @Component
  export default class Project extends Mixins(Mixin) {}
</script>
