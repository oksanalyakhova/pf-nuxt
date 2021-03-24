<template lang="pug">
  canvas.canvas
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Gl from '../gl/gl';

@Component
export default class Motion extends Gl {}
</script>

<style lang="sass">
@import '../../../assets/styles/setup'

</style>
