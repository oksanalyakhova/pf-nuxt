<template lang="pug">
  .intViewportHeight(
    :class="classObject"
    :style="{ width: vw + 'px', height: vh + 'px'}"
  )
    slot
</template>

<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  data() {
    return {
      vw: window.innerWidth,
      vh: window.innerHeight
    }
  },
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
export default class IntViewportHeight extends Vue {
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.setSizes);
    })
  }
  destroyed() {
    window.removeEventListener('resize', this.setSizes);
  }
  setSizes() {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
  }
  get classObject() {
    return {
      'is-dark': this.theme === 'dark',
      'is-light': this.theme === 'light',
      'is-transparent': this.theme === 'transparent'
    }
  }
}
</script>

<style lang="sass">
@import '../../../assets/styles/setup'

.intViewportHeight
  width: 100vw
  //width: calc(var(--vw, 1vw) * 100)
  height: 100vh
  //height: calc(var(--vh, 1vh) * 100)
  display: flex
  justify-content: center
  align-items: center

  &.is-dark
    color: $c-grey
    background-color: $c-black

  &.is-light
    color: $c-black
    background-color: $c-grey

  &.is-transparent
    background-color: transparent
</style>
