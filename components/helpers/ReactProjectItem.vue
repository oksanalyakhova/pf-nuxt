<template lang="pug">
  fragment
    a.react-project__link(
      :href="project.demo"
      target="_blank"
      rel="nofollow"
      @mouseenter="Enter"
      @mouseleave="Leave"
    )
      h2.react-project__title {{project.titleStart}}
        span.stroke {{project.titleEnd}}
        span.fill(
          ref="fill"
        ) {{project.titleEnd}}
    .react-project__info.is-text {{project.info}}
    ThemeLink(
      :class="`react-project__info`"
      :theme="`light`"
      :href="project.code"
      :name="`Git.`"
    )
</template>

<script lang="ts">
import Component, {mixins} from 'vue-class-component';
import ThemeLink from '~/components/helpers/ThemeLink.vue';
import {Prop} from 'vue-property-decorator';
import {gsap} from 'gsap/dist/gsap';
import deviceDetector from '@/mixins/deviceDetector';

@Component({
  components: {
    ThemeLink
  }
})
export default class ProjectItem extends mixins(deviceDetector) {
  @Prop({default: () => {}})
  project: object

  $refs!: {
    fill: HTMLElement,
    projectInfo: HTMLElement
  }

  mounted() {
    this.setStyles();
  }
  private setStyles(): void {
    gsap.set(this.$refs.fill, {
      webkitClipPath: 'inset(0% 100% 0% 0%)',
      clipPath: 'inset(0% 100% 0% 0%)'
    })
  }
  private Enter(e: {
    target: {querySelector: (arg0: string) => gsap.TweenTarget};
  }): void {
    if (!this.isMobile) {
      this.Hover(
        e.target.querySelector('.fill'),
        'inset(0% 0% 0% 0%)'
      )
    }
  }
  private Leave(e: {
    target: {querySelector: (arg0: string) => gsap.TweenTarget};
  }): void {
    if (!this.isMobile) {
      this.Hover(
        e.target.querySelector('.fill'),
        'inset(0% 100% 0% 0%)'
      )
    }
  }
  public Hover(
    targetFill: gsap.TweenTarget, clipPath: string
  ): void {
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
@import '../../assets/styles/setup'

.react-project
  &__link
    position: relative
    width: fit-content
    color: $c-grey

  &__title
    margin: 0
    position: relative
    display: inline-block
    font-weight: normal
    font-size: clamp(2.25rem, 6vw, 60rem)
    line-height: 1.25
    letter-spacing: .05em
    -webkit-text-stroke-width: 1px
    -webkit-text-stroke-color: $c-grey

    .stroke
      color: transparent
      -webkit-text-fill-color: transparent

    .fill
      position: absolute
      top: 0
      right: 0

  &__info
    margin: 1em 3em 0 0
    display: inline-block
    font-size: 12px
    line-height: 1.6667
    text-transform: uppercase
    white-space: nowrap

    &.is-text
      @include pseudo
      &::before
        top: .7em
        left: auto
        right: -1.5em
        width: .3em
        height: .3em
        background-color: $c-grey
        border-radius: 50%
</style>
