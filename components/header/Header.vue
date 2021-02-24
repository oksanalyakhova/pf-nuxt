<template lang="pug">
  .header
    Logo
    Nav
    Burger
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Logo from '~/components/helpers/logo/Logo.vue';
import Nav from '~/components/nav/Nav.vue';
import Burger from '~/components/helpers/burger/Burger.vue';

@Component({
  components: {
    Logo,
    Nav,
    Burger
  }
})
export default class Header extends Vue {}
</script>

<style scoped lang="sass">
  @import "header"
</style>
