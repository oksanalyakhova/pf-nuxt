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
        .text

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
