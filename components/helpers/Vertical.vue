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
import {Prop} from 'vue-property-decorator';

@Component
export default class Vertical extends Vue {
  @Prop({default: '0'})
  translate: string
  @Prop({default: 'top'})
  theme: string

  get classObject(): object {
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
