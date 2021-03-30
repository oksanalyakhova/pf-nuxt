<template lang="pug">
  .text.text-vertical(
    :class="classObject"
    :style="{transform: 'translateX('+ translate + '%) rotate(-90deg)'}"
  )
    slot
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    translate: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: ''
    }
  }
})
export default class Vertical extends Vue {
  private theme: string;

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
  font-size: clamp(4.25rem, 50vw, 400rem)
  white-space: nowrap
</style>
