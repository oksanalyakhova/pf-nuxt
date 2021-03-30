<template lang="pug">
  .scroll-message scroll
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ScrollMessage extends Vue {}
</script>

<style lang="sass">
@import '../../assets/styles/setup'

.scroll-message
  @include center(h)
  bottom: -.5em
  z-index: 0
  font-size: clamp(1.5rem, 3vw, 20rem)
  color: $c-sand

</style>
