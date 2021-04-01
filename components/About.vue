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
        .text
          .text__inner {{$t('about.intro.first')}}
        .text
          .text__inner {{$t('about.intro.second')}}
        .text
          .text__inner {{$t('about.intro.third')}}
        .text
          .text__inner(v-html="$t('about.intro.fourth')")
        .text
          .text__inner {{$t('about.intro.fifth')}}
    IntViewportHeight.section-first__say-hi(
      ref="thirdItem"
      theme="light"
    )
      .text(
        ref="email"
      ) Say hi
        a(
          href="mailto:bisov.point@gmail.com"
        ) bisov.point@gmail.com
      .line
      .text.is-right
        a.thtme-link(
          v-for="item in sayhiItems"
          :href="item.href"
          target="_blank"
          rel="nofollow"
        ) {{item.name}}

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import IntViewportHeight from '~/components/helpers/IntViewportHeight.vue';
import {gsap} from 'gsap/dist/gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  components: {
    IntViewportHeight
  }
})
export default class About extends Vue {
  $refs!: {
    fourthSection: HTMLElement,
  }

  get sayhiItems() {
    return this.$t('say-hi')
  }
  mounted() {
    this.scrollAnim();
  }
  private scrollAnim(): void {
    const letters = [...this.$refs.fourthSection.querySelectorAll('.section-fourth__title .letter')];
    const texts = [...this.$refs.fourthSection.querySelectorAll('.section-fourth__intro .text__inner')];

    const actionStart = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.fourthSection,
        pin: false,
        scrub: 0.3,
        start: 'top center',
        end: '+=2500',
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
        skewX: 50
      }, {
        y: 0,
        skewX: 0,
        duration: 5,
        ease: 'circ',
        stagger: 0.3
      }, 'spin')
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
</style>
