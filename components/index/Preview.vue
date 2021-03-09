<template lang="pug">
  .preview(ref="preview")
    .section.section_first.section-first(ref="firstSection")
      IntViewportHeight.section-first__item(
        ref="firstBlock"
        )
        img.img(
          :src="`img/o.png`"
          ref="image"
        )

      IntViewportHeight.section-first__item.from-right(
        ref="firstItem"
        theme="light"
      )

        .text.is-letter(
          ref="o"
          :style="{ transform: 'translateX('+ -translate + 'px)'}"
          ) O
        Splitting.from-right__letters(
          :text="`ksana`"
          )

      IntViewportHeight.section-first__item.from-right(
        ref="secondItem"
        theme="transparent"
      )
        .text.text_light(ref="lastname") Lyakhova

      IntViewportHeight.section-first__item.from-right.is-large(
        ref="thirdItem"
        theme="dark"
      )
        .text.text_light
          .vertical(ref="positionTop") Frontend
        .text.text_light
          .vertical(ref="positionBottom") Developer
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
  },
  data() {
    return {
      translate: 0
    }
  }
})

export default class Preview extends Vue {
  mounted() {
    this.scrollAnim();
    // this.setStyles();
    // this.$nextTick(() => {
    //   window.addEventListener('resize', this.setStyles);
    // })
  }

  destroyed() {
    // window.removeEventListener('resize', this.setStyles);
  }

  setStyles() {
    this.translate = window.innerWidth * 0.01 * 68.3;
    console.log(this.translate)
  }

  scrollAnim() {
    const slides = gsap.utils.toArray(this.$refs.preview.querySelectorAll('.from-right'));
    const letters = gsap.utils.toArray(this.$refs.preview.querySelectorAll('.from-right__letters .letter'));

    const actionStart = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.firstSection,
        pin: true,
        scrub: 0.3,
        start: "top top",
        end: "+=3000",
      }
    })
      .to(slides, {
        xPercent: -100,
        duration: 3,
        ease: "none",
        stagger: 3
      }, "spin")
      .from(letters, {
        x: 2000,
        duration: 2,
        ease: "circ",
        stagger: 0.25
      }, "spin")
      .to(this.$refs.o, {
        x: 0,
        duration: 2,
        ease: "circ"
      }, "spin")
      .to(this.$refs.lastname, {
        xPercent: -100,
        duration: 3,
        ease: "none"
      }, "spin -=3.5")
      .fromTo(this.$refs.positionTop, {
        xPercent: 150
      },
        {
          xPercent: -100,
          duration: 10,
          ease: "none"
        },
        "spin -=4.15")
      .fromTo(this.$refs.positionBottom, {
        xPercent: -150
      },
        {
          xPercent: 100,
          duration: 10,
          ease: "none"
        },
        "spin -=4.15")
      .to({},{duration: 1})

    window.addEventListener('resize', actionStart.update);
  }
}
</script>

<style lang="sass">
@import '../../assets/styles/setup'

.section-first
  position: relative
  width: 100%
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  font-size: clamp(4.25rem, 22vw, 200rem)

  &__item
    &.from-right
      position: absolute
      top: 0
      left: 100%
      width: 100%
      height: 100%

    &.is-large
      .text
        font-size: clamp(4.25rem, 50vw, 400rem)

        &:nth-child(1)
          transform: translateX(44%) rotate(-90deg)

        &:nth-child(2)
          transform: translateX(-34%) rotate(-90deg)

    .is-letter
      color: $c-grey
      mix-blend-mode: difference

    img
      @include center(both)
      display: none
</style>
