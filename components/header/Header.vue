<template lang="pug">
  .header
    Logo
    Nav
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Logo from '~/components/helpers/logo/Logo.vue';
import Nav from '~/components/nav/Nav.vue';

@Component({
  components: {
    Logo,
    Nav
  }
})
export default class Header extends Vue {}
</script>

<style scoped lang="sass">
  @import "header"
</style>
