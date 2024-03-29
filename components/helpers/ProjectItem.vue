<template lang="pug">
  a.project__link(
    :href="project.href"
    target="_blank"
    rel="nofollow"
    @mouseenter="Enter"
    @mouseleave="Leave"
  )
    Arrow(:theme="`dark`")
    h2.project__title(
      :data-project="project.label"
    ) {{project.titleStart}}
      span.stroke {{project.titleEnd}}
      span.fill(
        ref="fill"
      ) {{project.titleEnd}}
    .project__info(
      ref="projectInfo"
    ) {{project.info}}
</template>

<script lang="ts">
import Component, {mixins} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {gsap} from 'gsap/dist/gsap';
import deviceDetector from '@/mixins/deviceDetector.ts';
import Arrow from '~/components/helpers/Arrow.vue';

@Component({
  components: {
    Arrow
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
    if (this.isMobile) {
      gsap.set(this.$refs.projectInfo, {
        autoAlpha: 1
      })
    }
  }
  private Enter(e: {
    target: {querySelector: (arg0: string) => gsap.TweenTarget};
  }): void {
    if (!this.isMobile) {
      this.Hover(
        e.target.querySelector('.fill'),
        e.target.querySelector('.project__info'),
        'inset(0% 0% 0% 0%)',
        1
      )
    }
  }
  private Leave(e: {
    target: {querySelector: (arg0: string) => gsap.TweenTarget};
  }): void {
    if (!this.isMobile) {
      this.Hover(
        e.target.querySelector('.fill'),
        e.target.querySelector('.project__info'),
        'inset(0% 100% 0% 0%)',
        0
      )
    }
  }
  public Hover(
    targetFill: gsap.TweenTarget, targetInfo: gsap.TweenTarget, clipPath: string, autoAlpha: number
  ): void {
    const hoverAnim = gsap.timeline()
      .to(targetFill, {
        webkitClipPath: clipPath,
        clipPath: clipPath,
        duration: 0.45,
        ease: 'none'
      }, 'spin')
      .to(targetInfo, {
        autoAlpha: autoAlpha,
        duration: 0.15,
        ease: 'none'
      }, 'spin')
  }
}
</script>

<style lang="sass">
@import '../../assets/styles/setup'
.project
  &__link
    position: relative
    width: fit-content
    color: $c-black
  &__title
    margin: 0
    position: relative
    display: inline-block
    font-weight: normal
    font-size: clamp(2.25rem, 6vw, 60rem)
    line-height: 1.25
    letter-spacing: .05em
    -webkit-text-stroke-width: 1px
    -webkit-text-stroke-color: $c-black
    .stroke
      color: transparent
      -webkit-text-fill-color: transparent
    .fill
      position: absolute
      top: 0
      right: 0
  &__info
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
