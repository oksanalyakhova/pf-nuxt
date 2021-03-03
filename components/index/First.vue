<template lang="pug">
  .section.section_first.section-first
    FirstPreview
    FirstHello
    FirstHelloDouble
</template>

<script>
import Vue from 'vue'
import FirstPreview from '../helpers/FirstPreview'
import FirstHello from '../helpers/FirstHello'
import FirstHelloDouble from '../helpers/FirstHelloDouble'
import Component from 'vue-class-component'

@Component({
  components: {
    FirstPreview,
    FirstHello,
    FirstHelloDouble
  }
})

export default class First extends Vue {}
</script>

<style lang="sass">
.section_first
  font-size: clamp(5.5rem, 25vw, 150rem)

</style>
