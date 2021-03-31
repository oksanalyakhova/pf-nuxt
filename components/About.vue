<template lang="pug">
  .section.section_fourth.section-fourth
    .section-fourth__title
      Splitting(
        :text="`About`"
      )
    .section-fourth__intro(
      ref="secondItem"
    )
      .intro
        .text {{$t('about.intro.first')}}
        .text {{$t('about.intro.second')}}
        .text {{$t('about.intro.third')}}
        .text {{$t('about.intro.fourth')}}
        .text {{$t('about.intro.fifth')}}

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {gsap} from 'gsap/dist/gsap';
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component
export default class About extends Vue {

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
    font-size: clamp(4.25rem, 50vw, 400rem)
    white-space: nowrap
</style>
