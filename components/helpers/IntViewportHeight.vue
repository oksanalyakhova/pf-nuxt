<template lang="pug">
  .intViewportHeight(
    :class="classObject"
    :style="{ width: vw + 'px', height: vh + 'px'}"
  )
    slot
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

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
export default class IntViewportHeight extends Vue {
  vw = 0;
  vh = 0;
  public theme: string;

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
  private setSizes(): void {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
  }
}
</script>

<style lang="sass">
@import '../../assets/styles/setup'

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

  &.is-transparent
    background-color: transparent
</style>
