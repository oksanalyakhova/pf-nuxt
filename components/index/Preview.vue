<template lang="pug">
  .preview(ref="preview")
    .section.section_first.section-first(ref="firstSection")
      IntViewportHeight.section-first__item(
          ref="firstBlock"
        )

      IntViewportHeight.section-first__item.from-right(
        ref="firstItem"
        theme="light"
      )
        .text.is-letter(
          ref="o"
          :style="{transform: 'translateX('+ translate + 'px)'}"
          ) O
          DisplacementAnim
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
          .vertical(ref="top") Frontend
        .text.text_light
          .vertical(ref="bottom") Developer
      IntViewportHeight.section-first__item(
        theme="dark"
      )

      .pseudo(
        ref="pseudo"
      )
</template>

<script>
import Vue from 'vue';
import IntViewportHeight from './partials/IntViewportHeight';
import DisplacementAnim from './partials/DisplacementAnim';
import Component from 'vue-class-component';
import {gsap} from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

@Component({
  components: {
    IntViewportHeight,
    DisplacementAnim
  },
  data() {
    return {
      vw: window.innerWidth
    }
  }
})

export default class Preview extends Vue {
  created() {
    this.setWindowSizes();
  }
  mounted() {
    this.scrollAnim();

    this.$nextTick(() => {
      window.addEventListener('resize', this.setWindowSizes);
    })
  }
  destroyed() {
    window.removeEventListener('resize', this.setWindowSizes);
  }
  setWindowSizes() {
    this.vw = window.innerWidth;
  }
  get translate() {
    return `${ -(this.vw  * 0.699) }`
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
        invalidateOnRefresh: true
      }
    })
      .to(slides, {
        xPercent: -100,
        duration: 3,
        ease: "none",
        stagger: 3
      }, "spin")
      .fromTo(letters, {
        x: 2000
      }, {
        x: 0,
        duration: 2,
        ease: "circ",
        stagger: 0.3
      }, "spin")
      .to(this.$refs.o, {
        x: 0,
        duration: 1.5,
        ease: "none"
      }, "spin")
      .to(this.$refs.lastname, {
        xPercent: -100,
        duration: 3,
        ease: "none"
      }, "spin -=3.5")
      .fromTo(this.$refs.top, {
        xPercent: 100
      }, {
          xPercent: -150,
          skewX: -5,
          duration: 10,
          ease: "none"
        },
        "spin -=2.15")
      .fromTo(this.$refs.bottom, {
        xPercent: -150
      }, {
          xPercent: 150,
          skewX: -5,
          duration: 10,
          ease: "none"
        },
        "spin -=3.15")
      .to(this.$refs.pseudo, {
          top: 0,
          duration: 2,
          ease: "none"
        },
        "spin +=2.85")

    window.addEventListener('resize', () => {
      ScrollTrigger.refresh()
    });
  }
}
</script>

<style lang="sass">
@import '../../assets/styles/setup'

.preview
  overflow: hidden

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
        color: transparent
        mix-blend-mode: difference

    .pseudo
      position: absolute
      top: 100%
      left: 0
      width: 100vw
      width: calc(var(--vw, 1vw) * 100)
      height: 100vh
      height: calc(var(--vh, 1vh) * 100)
      background-color: $c-grey
</style>
