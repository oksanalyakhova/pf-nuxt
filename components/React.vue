<template lang="pug">
  .section.section_third.section-third(
    ref="thirdSection"
  )
    .section-third__title(
      ref="firstItem"
    )
      Vertical(
        theme="top"
        translate="-25.5"
      )
        .vertical(ref="top") &hearts; React
    .section-third__intro(
      ref="secondItem"
    )
      .intro
        .text {{$t('react.intro.start')}}
        .text {{$t('react.intro.middle')}}
        .text {{$t('react.intro.end')}}

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import IntViewportHeight from '~/components/helpers/IntViewportHeight.vue';
import Vertical from '~/components/helpers/Vertical.vue';
import {gsap} from 'gsap/dist/gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  components: {
    IntViewportHeight,
    Vertical
  },
})
export default class React extends Vue {
  $refs!: {
    thirdSection: HTMLElement,
    firstItem: HTMLElement,
    secondItem: HTMLElement,
    top: HTMLElement
  }

  mounted() {
    this.scrollAnim();
  }
  private scrollAnim(): void {
    const actionStart = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.thirdSection,
        pin: this.$refs.firstItem,
        anticipatePin: 1,
        scrub: 0.3,
        start: 'top center',
        end: '+=10000',
        invalidateOnRefresh: true,
      }
    })
      .fromTo(this.$refs.top, {
        xPercent: 95
      }, {
        xPercent: -110,
        skewX: -5,
        duration: 10,
        ease: 'none'
      }, 'spin')
      .fromTo(this.$refs.secondItem, {
        yPercent: 0,
      }, {
        yPercent: -100,
        duration: 20,
        ease: 'none'
      }, 'spin +=10.5')

    window.addEventListener('resize', () => ScrollTrigger.refresh());
  }
}
</script>

<style lang="sass">
@import '../assets/styles/setup'

.section-third
  position: relative
  z-index: 1
  height: 325vh
  color: $c-grey
  background-color: $c-black
  overflow: hidden

  &__title
    position: absolute
    top: 0
    left: 0
    z-index: 1
    width: 100%
    height: fit-content

    .text
      position: absolute
      top: 10vw
      left: 0
      width: 100%
      font-size: clamp(4.25rem, 50vw, 400rem)
      text-align: center
      white-space: nowrap
      will-change: transform

  &__intro
    position: absolute
    top: 100vh
    top: calc(var(--vh, 1vh) * 100)
    left: 0
    z-index: 2
    width: 100%
    display: flex
    justify-content: center
    color: $c-grey

    .intro
      padding: 0 6.25vw 0 50vw
</style>

