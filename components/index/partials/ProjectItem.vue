<template lang="pug">
  li.project__item
    a.project__link(
      :href="project.href"
      target="_blank"
      rel="nofollow"
    )
      h2.project-title(
        :data-project="project.label"
      ) {{project.titleStart}}
        span.stroke {{project.titleEnd}}
        span.fill {{project.titleEnd}}
      .project-info {{project.info}}
</template>

<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  props: {
    project: {
      type: Object,
      default: () => {}
    }
  }
})
export default class ProjectItem extends Vue {}
</script>

<style lang="sass">
@import '../../../assets/styles/setup'

.project
  &__item
    margin: 0 0 5vw

    +rmin(1024)
      margin: 0 0 100px

  &__link
    position: relative
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

</style>
