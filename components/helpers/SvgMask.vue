<template lang="pug">
  svg.filter-svg(width="538" height="190" viewBox="0 0 600 200")
    defs
      filter(id="turb")
        feTurbulence(
          id="turbwave"
          type="fractalNoise"
          baseFrequency="0.01"
          numOctaves="2"
          result="turbulence_3"
          data-filterId="3"
        )
        feDisplacementMap(
          xChannelSelector="R"
          yChannelSelector="G"
          in="SourceGraphic"
          in2="turbulence_3"
          scale="40"
        )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class SvgMask extends Vue {}
</script>
