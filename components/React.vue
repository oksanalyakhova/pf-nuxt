<template lang="pug">
  .section.section_third.section-third
    IntViewportHeight.section-first__item.from-right.is-large(
      ref="thirdItem"
      theme="dark"
    )

      .text.text_light
        .vertical(ref="top") Frontend
      .text.text_light
        .vertical(ref="bottom") Developer

</template>

<script>
import Component, {mixins} from 'vue-class-component';
import IntViewportHeight from './helpers/IntViewportHeight';
import deviceDetector from '@/mixins/deviceDetector';
import gsap from 'gsap';

@Component({
  components: {
    IntViewportHeight
  },
})
export default class React extends mixins(deviceDetector) {

}
</script>

<style lang="sass">
@import '../assets/styles/setup'


</style>
