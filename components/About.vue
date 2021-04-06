<template lang="pug">
  .section.section_fourth.section-fourth(
    ref="fourthSection"
  )
    .section-fourth__title
      Splitting(
        :text="`About`"
      )
    .section-fourth__intro(
      ref="secondItem"
    )
      .intro
        .text(
          v-for="item in introTexts"
        )
          .text__inner(
            v-html="item"
          )
    IntViewportHeight.section-fourth__say-hi(
      ref="thirdItem"
      theme="light"
    )
      .text(
        ref="email"
      ) Say hi
        a(
          :href="`mailto:bisov.point@gmail.com`"
          @mouseenter="Enter"
          @mouseleave="Leave"
        )
          span.fill bisov.point@gmail.com
          span.stroke bisov.point@gmail.com
      .line
      .text.is-right
        a(
          v-for="item in sayhiItems"
          :key="item.name"
          :href="item.href"
          target="_blank"
          rel="nofollow"
          @mouseenter="Enter"
          @mouseleave="Leave"
        )
          span.fill {{item.name}}
          span.stroke {{item.name}}
</template>

<script lang="ts">
import Component, {mixins} from 'vue-class-component';
import IntViewportHeight from '~/components/helpers/IntViewportHeight.vue';
import ThemeLink from '~/components/helpers/ThemeLink.vue';
import deviceDetector from '@/mixins/deviceDetector.ts';
import {gsap} from 'gsap/dist/gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

@Component({
  components: {
    IntViewportHeight,
    ThemeLink
  }
})
export default class About extends mixins(deviceDetector) {
  $refs!: {
    fourthSection: HTMLElement
  }

  get introTexts() {
    return this.$t('about.intro')
  }
  get sayhiItems() {
    return this.$t('say-hi')
  }
  mounted() {
    this.scrollAnim();
  }
  private scrollAnim(): void {
    const letters = [...this.$refs.fourthSection.querySelectorAll('.letter')];
    const texts = [...this.$refs.fourthSection.querySelectorAll('.text__inner')];
    const height = this.$refs.fourthSection.clientHeight;

    const actionStart = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.fourthSection,
        pin: false,
        scrub: 0.6,
        start: 'top center',
        end: '+=' + height / 3,
        invalidateOnRefresh: true,
      }
    })
      .fromTo(letters, {
        x: 1000
      }, {
        x: 0,
        duration: 5,
        ease: 'circ',
        stagger: 0.3
      }, 'spin')
      .fromTo(texts, {
        y: 1000,
        skewX: -50
      }, {
        y: 0,
        skewX: 0,
        duration: 5,
        ease: 'circ',
        stagger: 0.3
      }, 'spin -=4')

    window.addEventListener('resize', () => ScrollTrigger.refresh());
  }
  private Enter(e: {
    target: {querySelector: (arg0: string) => gsap.TweenTarget};
  }): void {
    if (!this.isMobile) {
      this.Hover(
        e.target.querySelector('.fill'),
        'inset(0% 100% 0% 0%)'
      )
    }
  }
  private Leave(e: {
    target: {querySelector: (arg0: string) => gsap.TweenTarget};
  }): void {
    if (!this.isMobile) {
      this.Hover(
        e.target.querySelector('.fill'),
        'inset(0% 0% 0% 0%)'
      )
    }
  }
  public Hover(
    targetFill: gsap.TweenTarget, clipPath: string
  ) {
    const hoverAnim = gsap.timeline()
      .to(targetFill, {
        webkitClipPath: clipPath,
        clipPath: clipPath,
        duration: 0.45,
        ease: 'none'
      })
  }
}
</script>

<style lang="sass">
@import '../assets/styles/setup'

.section-fourth
  position: relative
  z-index: 2
  color: $c-black
  background-color: $c-grey

  &__title
    font-size: clamp(4.25rem, 30vw, 200rem)
    white-space: nowrap
    text-align: center
    -webkit-text-fill-color: transparent
    -webkit-text-stroke-width: 1px
    -webkit-text-stroke-color: $c-black

  &__intro
    padding: 0 13.25vw 13.25vw

    .text
      overflow: hidden

    span
      -webkit-text-fill-color: transparent
      -webkit-text-stroke-width: 1px
      -webkit-text-stroke-color: $c-black

  &__say-hi
    padding: 0 14vw
    flex-direction: column
    align-items: flex-start
    font-size: clamp(1.5rem, 5vw, 50rem)

    .text
      margin: 2rem 0
      display: flex
      flex-wrap: wrap

      &.is-right
        align-self: flex-end

      a
        position: relative
        margin: 0 0 0 .55em
        -webkit-text-stroke-width: 1px
        -webkit-text-stroke-color: $c-black

        .stroke
          color: transparent
          -webkit-text-fill-color: transparent

        .fill
          position: absolute
          top: 0
          right: 0

    .line
      width: 100%
      height: 4px
      background-color: $c-black
</style>
