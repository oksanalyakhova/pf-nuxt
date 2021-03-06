<template lang="pug">
  .preview
    .section.section_first.section-first(ref="firstSection")
      IntViewportHeight.section-first__item(ref="firstBlock")
        img.img(
          :src="`img/o.png`"
          ref="image"
        )

      IntViewportHeight.section-first__item.from-right(
        ref="firstItem"
        theme="light"
      )
        Splitting.from-right__letters(
          :text="`Oksana`"
          )

      IntViewportHeight.section-first__item.from-right.is-large(
        ref="secondItem"
        theme="transparent"
      )
        .text.text_light Lyakhova

      IntViewportHeight.section-first__item.from-right(
        ref="thirdItem"
        theme="dark"
      )
        .text Frontend
        .text Developer

    .section.section_second.section-second(ref="secondSection")
      IntViewportHeight
</template>

<script>
import Vue from 'vue';
import IntViewportHeight from './parts/IntViewportHeight';
import Component from 'vue-class-component';
import {gsap} from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

@Component({
  components: {
    IntViewportHeight,
  }
})

export default class Preview extends Vue {
  mounted() {
    console.log(this.$refs.secondItem)
    this.scrollAnim();
  }
  scrollAnim() {
    const slides = [...document.querySelectorAll('.from-right')];
    const letters = [...document.querySelectorAll('.from-right__letters .letter')];

    console.log(letters)

    const action = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.firstSection,
        pin: true,
        scrub: 0.3,
        start: "top top",
        end: "+=3000"
      }
    })
      .to(slides, {
        xPercent: -100,
        duration: 3,
        ease: "none",
        stagger: 3
      }, "spin")
      .from(letters, {
        x: 1000,
        duration: 2.5,
        ease: "circ",
        stagger: 0.25
      }, "spin")
      .to({},{duration: 1})
  }
}
</script>

<style lang="sass">
.preview
  overflow: hidden

  .section
    position: relative
    width: 100%
    height: 100vh
    height: calc(var(--vh, 1vh) * 100)
    font-size: clamp(4.25rem, 20vw, 150rem)

    .from-right
      position: absolute
      top: 0
      left: 100%
      width: 100%
      height: 100%
      overflow: hidden

      &.is-large
        padding-right: 60%
        width: 200%

  img
    width: 30vw
</style>
