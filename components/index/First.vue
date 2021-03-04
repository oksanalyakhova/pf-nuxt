<template lang="pug">
  .section.section_first.section-first(ref="section")

    FirstBlock.section-first__item
      img.img(
        :src="`img/o.png`"
        ref="image"
      )

    .section-first__item.second-block()
      FirstBlock.second-block__item(
        ref="firstItem"
        theme="light"
      )
        Splitting(
          :text="`Oksana`"
          theme="uppercase"
          )
      FirstBlock.second-block(
        ref="secondItem"
        theme="light"
      )
        .text.text_light.text_uppercase Lyakhova
      FirstBlock.second-block.is-large(
        ref="thirdItem"
        theme="dark"
      )
        .text Frontend
        .text Developer
</template>

<script>
import Vue from 'vue';
import FirstBlock from '../helpers/FirstBlock';
import Component from 'vue-class-component';
import {gsap} from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

@Component({
  components: {
    FirstBlock,
  }
})

export default class First extends Vue {
  mounted() {
    console.log(this.$refs.secondItem)
    this.scrollAnim();
  }
  scrollAnim() {
    gsap.to(this.$refs.firstItem.$el, {
      xPercent: -100,
      duration: 2,
      ease: "none",
      scrollTrigger: {
        trigger: this.$refs.section,
        pin: true,
        scrub: 0.3,
        start: "top top",
        end: "+=3000"
      }
    })

    gsap.to(this.$refs.secondItem.$el, {
      xPercent: -100,
      duration: 2,
      ease: "none",
      scrollTrigger: {
        trigger: this.$refs.firstItem.$el,
        pin: true,
        scrub: 0.3,
        start: "top top",
        end: "+=3000"
      }
    })
  }
}
</script>

<style lang="sass">
.section-first
  font-size: clamp(4.25rem, 20vw, 150rem)
  position: relative
  width: 100vw
  width: calc(var(--vw, 1vw) * 100)
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)

  img
    width: 30vw

  .second-block
    position: absolute
    top: 0
    left: 100%
    width: 100%
    height: 100%

    &__item
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
</style>
