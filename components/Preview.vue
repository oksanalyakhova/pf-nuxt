<template lang="pug">
  .section.section_first.section-first(
    ref="firstSection"
  )
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
        //img.is-letter-img(
        //  src="img/o.png"
        //)
      Splitting.from-right__letters(
        :text="$t('name.first')"
      )

    IntViewportHeight.section-first__item.from-right(
      ref="secondItem"
      theme="transparent"
    )
      .text(ref="lastname") {{$t('name.last')}}

    IntViewportHeight.section-first__item.from-right(
      ref="thirdItem"
      theme="dark"
    )

      Vertical(
        theme="top"
        translate="44"
      )
        .vertical(ref="top") Frontend
      Vertical(
        theme="bottom"
        translate="-34"
      )
        .vertical(ref="bottom") Developer

    IntViewportHeight.section-first__item(
      theme="dark"
    )

      Vertical(ref="vertical")
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import IntViewportHeight from './helpers/IntViewportHeight';
import Vertical from './helpers/Vertical';
import DisplacementAnim from './partials/DisplacementAnim';
import gsap from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

@Component({
  components: {
    IntViewportHeight,
    Vertical,
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
    const slides = gsap.utils.toArray(this.$refs.firstSection.querySelectorAll('.from-right'));
    const letters = gsap.utils.toArray(this.$refs.firstSection.querySelectorAll('.from-right__letters .letter'));

    const actionStart = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.firstSection,
        pin: true,
        scrub: 0.3,
        start: 'top top',
        end: '+=3000',
        invalidateOnRefresh: true,
      }
    })
      .to(slides, {
        xPercent: -100,
        duration: 3,
        ease: 'none',
        stagger: 3
      }, 'spin')
      .fromTo(letters, {
        x: 2000
      }, {
        x: 0,
        duration: 2,
        ease: 'circ',
        stagger: 0.3
      }, 'spin')
      .to(this.$refs.o, {
        x: 0,
        duration: 1.5,
        ease: 'none'
      }, 'spin')
      .to(this.$refs.lastname, {
        xPercent: -100,
        duration: 3,
        ease: 'none'
      }, 'spin -=3.5')
      .fromTo(this.$refs.top, {
        xPercent: 100
      }, {
          xPercent: -70,
          skewX: -5,
          duration: 10,
          ease: 'none'
        }, 'spin -=3.15')
      .fromTo(this.$refs.bottom, {
        xPercent: -80
      }, {
          xPercent: 45,
          skewX: -5,
          duration: 10,
          ease: 'none'
        }, 'spin -=3.15')

    window.addEventListener('resize', () => {
      ScrollTrigger.refresh()
    });
  }
}
</script>

<style lang="sass">
@import '../assets/styles/setup'

.section-first
  position: relative
  z-index: 1
  width: 100%
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  font-size: clamp(4.25rem, 22vw, 200rem)
  overflow: hidden

  &__item
    &.from-right
      position: absolute
      top: 0
      left: 100%
      width: 100%
      height: 100%

    .is-letter
      position: relative
      color: transparent
      mix-blend-mode: difference
</style>
