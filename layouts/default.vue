<template lang="pug">
  client-only
    .app
      Nuxt
</template>

<script lang="ts">
  import { Component, Mixins } from 'vue-property-decorator';
  import Mixin from '@/mixins/global';

  @Component
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
