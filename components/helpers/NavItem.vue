<template lang="pug">
  li.main-nav__item
    a.main-nav__link(
      :href="href"
      target="_self"
      :class="{ 'is-active': isActive }"
      ) {{ text }}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    href: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    }
  }
})

export default class NavItem extends Vue {}
</script>

<style scoped lang="sass">

</style>
