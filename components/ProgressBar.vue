<template lang="pug">
  .progress-bar
    .filled-bar(
      :style="{transform: `translate3d(0, -${(1 - value) * 100}%, 0)`}"
    )

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component
export default class ProgressBar extends Vue {
  @Prop({default: 0})
  value: number
}
</script>

<style lang="sass">
@import '../assets/styles/setup'

.progress-bar
  position: fixed
  top: 0
  right: 0
  z-index: 100
  height: 100%
  width: 5px
  overflow: hidden
  background-color: $c-black
  mix-blend-mode: difference

  .filled-bar
    position: absolute
    top: 0
    left: 0
    z-index: 2
    height: 100%
    width: 100%
    background-color: $c-grey
</style>
