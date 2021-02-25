<template lang="pug">
  .header
    Logo
    Nav
    Burger
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import Logo from '~/components/helpers/Logo.vue';
import Nav from '~/components/Nav.vue';
import Burger from '~/components/helpers/Burger.vue';

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

</style>
