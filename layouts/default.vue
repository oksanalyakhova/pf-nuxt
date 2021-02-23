<template lang="pug">
  client-only
    .app
      Header
      Nuxt
</template>

<script lang="ts">
  import Component from 'vue-class-component';
  import { Mixins } from 'vue-property-decorator';
  import Mixin from '@/mixins/global';
  import Header from '~/components/header/Header.vue';

  import '@/assets/styles/common.sass';

  @Component({
    components: {
      Header
    }
  })
  export default class Project extends Mixins(Mixin) {}
</script>

<style lang="sass">
  .app
    min-height: 100vh
    min-height: calc(var(--vh, 1vh) * 100)
    display: flex
    flex-direction: column

    main
      flex-grow: 1
</style>
