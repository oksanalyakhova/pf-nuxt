<template lang="pug">
  .text.text-vertical(
    :class="classObject"
  )
    slot
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component'

@Component({
  props: {
    theme: {
      type: String,
      default: ''
    }
  }
})
export default class Vertical extends Vue {
  get classObject() {
    return {
      'text-vertical_top': this.theme === 'top',
      'text-vertical_bottom': this.theme === 'bottom'
    }
  }
}
</script>

<style lang="sass">
.text-vertical
  &_top
    transform: translateX(44%) rotate(-90deg)

  &_bottom
    transform: translateX(-34%) rotate(-90deg)
</style>
