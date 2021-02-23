<template lang="pug">
  ul.main-nav
    NavItem(
      v-for="(item, index) in items"
      :key="index"
      :href="item.href"
      :isActive="item.isActive"
      :text="item.text"
      )
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import NavItem from '~/components/helpers/nav-item/NavItem.vue';

@Component({
  components: {
    NavItem
  }
})
export default class Nav extends Vue {
  items: Array<object> = [
    {
      href: "#",
      isActive: true,
      text: 'text 1'
    },
    {
      href: "#",
      isActive: false,
      text: 'text 2'
    },

  ]
}
</script>

<style scoped lang="sass">
  @import "nav"
</style>
