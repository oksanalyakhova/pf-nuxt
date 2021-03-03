<template lang="pug">
  .intViewportHeight(
    :class="classObject"
  )
    slot
</template>

<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  props: {
    className: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'dark'
    },
  }
})
export default class FirstBlock extends Vue {
  get classObject() {
    return {
      'is-dark': this.theme === 'dark',
      'is-light': this.theme === 'light'
    }
  }
}
</script>

<style lang="sass">
@import './assets/styles/setup'

.intViewportHeight
  width: 100vw
  width: calc(var(--vw, 1vw) * 100)
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  display: flex
  justify-content: center
  align-items: center

  &.is-dark
    color: $c-grey
    background-color: $c-black
  &.is-light
    color: $c-black
    background-color: $c-grey
</style>
