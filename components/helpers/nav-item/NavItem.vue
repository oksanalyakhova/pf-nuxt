<template lang="pug">
  li.main-nav__item
    a.main-nav__link(
      :href="href"
      target="_self"
      :class="{ 'is-active': isActive }"
      ) {{ text }}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
})
export default class NavItem extends Vue {
  @Prop({ type: String, default: '' })
  href!: string

  @Prop({ type: Boolean, default: false })
  isActive!: boolean

  @Prop({ type: String, default: '' })
  text!: string
}
</script>

<style scoped lang="sass">
  @import "nav-item"
</style>
