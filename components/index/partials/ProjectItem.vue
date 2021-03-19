<template lang="pug">
  li.project__item
    a.project__link(
      :href="project.href"
      target="_blank"
      rel="nofollow"
      @mouseenter="Enter"
      @mouseleave="Leave"
    )
      h2.project-title(
        :data-project="project.label"
      ) {{project.titleStart}}
        span.stroke {{project.titleEnd}}
        span.fill(
          ref="fill"
        ) {{project.titleEnd}}
      .project-info {{project.info}}
</template>

<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {gsap} from 'gsap/dist/gsap';

@Component({
  props: {
    project: {
      type: Object,
      default: () => {}
    }
  }
})
export default class ProjectItem extends Vue {
  mounted() {
    this.setStyles();
  }
  setStyles() {
    gsap.set(this.$refs.fill, {
      webkitClipPath: 'inset(0% 100% 0% 0%)',
      clipPath: 'inset(0% 100% 0% 0%)'
    })
  }
  Enter(e) {
    const enterStart = gsap.timeline()
      .to(e.target.querySelector('.fill'), {
        webkitClipPath: 'inset(0% 0% 0% 0%)',
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.45,
        ease: "none"
      }, "spin")
      .to(e.target.querySelector('.project-info'), {
        autoAlpha: 1,
        duration: 0.15,
        ease: "none"
      }, "spin")
  }
  Leave(e) {
    const enterEnd = gsap.timeline()
      .to(e.target.querySelector('.fill'), {
        webkitClipPath: 'inset(0% 100% 0% 0%)',
        clipPath: 'inset(0% 100% 0% 0%)',
        duration: 0.45,
        ease: "none"
      }, "spin")
      .to(e.target.querySelector('.project-info'), {
        autoAlpha: 0,
        duration: 0.15,
        ease: "none"
      }, "spin")
  }
}
</script>

<style lang="sass">
@import '../../../assets/styles/setup'

.project
  &__item
    margin: 0 0 5vw
    user-select: none

    +rmin(1024)
      margin: 0 0 100px

  &__link
    position: relative
    width: fit-content
    color: $c-black

    .project-title
      margin: 0
      position: relative
      display: inline-block
      font-weight: normal
      font-size: 5.2083vw
      line-height: 1.25
      letter-spacing: .05em
      -webkit-text-stroke-width: 1px
      -webkit-text-stroke-color: $c-black

      +rmin(1024)
        font-size: 50px

      .stroke
        color: transparent
        -webkit-text-fill-color: transparent

      .fill
        position: absolute
        top: 0
        right: 0

    .project-info
      position: absolute
      left: 0
      top: 100%
      opacity: 0
      user-select: none
      font-weight: bold
      font-size: 12px
      line-height: 1.6667
      text-transform: uppercase
      white-space: nowrap

</style>
