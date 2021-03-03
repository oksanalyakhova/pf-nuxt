<template lang="pug">
  .section.section_first.section-first
    FirstBlock.section-first__item
      img.img(
        :src="`img/o.png`"
        ref="image"
      )
    FirstBlock.section-first__item(
      theme="light"
    )
      Splitting(
        :text="`Oksana`"
        theme="uppercase"
        )
</template>

<script>
import Vue from 'vue'
import FirstBlock from '../helpers/FirstBlock'
import Component from 'vue-class-component'

@Component({
  components: {
    FirstBlock,
  }
})

export default class First extends Vue {}
</script>

<style lang="sass">
.section_first
  font-size: clamp(5.5rem, 25vw, 150rem)

  img
    width: 30vw

</style>
