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
  props: {
    className: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'dark'
    },
  },
  data() {
    return {
      vw: window.innerWidth,
      vh: window.innerHeight
    }
  }
})
export default class IntViewportHeight extends Vue {
  get classObject() {
    return {
      'is-dark': this.theme === 'dark',
      'is-light': this.theme === 'light',
      'is-transparent': this.theme === 'transparent'
    }
  }
  created() {
    this.setSizes();
  }
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
}
</script>

<style lang="sass">
@import '../../../assets/styles/setup'

.intViewportHeight
  width: 100vw
  height: 100vh
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
