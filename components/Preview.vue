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
        :style="{transform: `translateX(${translate}px)`}"
      )
        span.stroke O
        span.fill(
          ref="fill"
        ) O
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
        .vertical(ref="top") {{$t('position.start')}}
      Vertical(
        theme="bottom"
        translate="-34"
      )
        .vertical(ref="bottom") {{$t('position.end')}}

    IntViewportHeight.section-first__item(
      theme="dark"
    )

      Vertical(ref="vertical")

    ScrollMessage
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Vertical from '~/components/helpers/Vertical.vue';
import ScrollMessage from '~/components/helpers/ScrollMessage.vue';
import IntViewportHeight from '~/components/helpers/IntViewportHeight.vue';
import {gsap} from 'gsap/dist/gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  components: {
    IntViewportHeight,
    Vertical,
    ScrollMessage
  }
})
export default class Preview extends Vue {
  vw: number = window.innerWidth;
  $refs!: {
    fill: HTMLElement,
    firstSection: HTMLElement,
    o: HTMLElement,
    lastname: HTMLElement,
    top: HTMLElement,
    bottom: HTMLElement
  }

  created() {
    this.setWindowSizes();
  }
  mounted() {
    this.scrollAnim();

    window.addEventListener('load', this.setStyles)
    this.$nextTick(() => {
      window.addEventListener('resize', this.setWindowSizes);
    })
  }
  destroyed() {
    window.removeEventListener('resize', this.setWindowSizes);
  }
  private setWindowSizes(): void {
    this.vw = window.innerWidth;
  }
  private setStyles(): void {
    gsap.to(this.$refs.fill, {
      webkitClipPath: 'inset(0% 0% 0% 0%)',
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.45,
      ease: 'none'
    })
  }
  get translate() {
    return `${ -(this.vw  * 0.699) }`
  }
  private scrollAnim(): void {
    const slides = [...this.$refs.firstSection.querySelectorAll('.from-right')];
    const letters = [...this.$refs.firstSection.querySelectorAll('.from-right__letters .letter')];

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

    window.addEventListener('resize', () => ScrollTrigger.refresh());
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
      z-index: 1
      left: 100%
      width: 100%
      height: 100%

    .is-letter
      position: relative
      display: inline-block
      color: $c-grey
      -webkit-text-stroke-width: 1px
      -webkit-text-stroke-color: $c-grey
      mix-blend-mode: difference

      .stroke
        color: transparent
        -webkit-text-fill-color: transparent

      .fill
        position: absolute
        top: 0
        right: 0
        clip-path: inset(100% 0% 0% 0%)
</style>
