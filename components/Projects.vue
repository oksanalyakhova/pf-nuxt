<template lang="pug">
  .section.section_second.section-second
    ul.projects-list
      li.projects-list__item.project(
        v-for="project in projects"
        :key="project.label"
        :data-img="project.preview"
        @mouseenter="Enter"
        @mouseleave="Leave"
      )
        ProjectItem(
          :project="project"
        )
    .preview(
      ref="preview"
    )
      svg.preview-svg(ref="img")
        image(
          x="0"
          y="0"
          width="100%"
          height="100%"
          :xlink:href="image"
          filter="url(#turb)"
        )
      SvgMask(v-if="Enter")
</template>

<script lang="ts">
import Component, {mixins} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import SvgMask from '~/components/helpers/SvgMask.vue';
import ProjectItem from '~/components/helpers/ProjectItem.vue';
import deviceDetector from '@/mixins/deviceDetector';
import {gsap} from 'gsap/dist/gsap';

@Component({
  components: {
    ProjectItem,
    SvgMask
  }
})
export default class Projects extends mixins(deviceDetector) {
  @Prop({default: () => []})
  projects: []

  image: string = '';
  $refs!: {
    preview: HTMLElement,
    img: HTMLElement
  }

  private Enter(e: {
    target: {dataset: {img: string;}};
  }): void {
    if (!this.isMobile) {
      this.image = e.target.dataset.img;
      this.runWave();
      this.showImage();
    }
  }
  private Leave(e: any): void {
    if (!this.isMobile) {
      this.stopWave();
      this.hideImage();
    }
  }
  private showImage(): void {
    gsap.killTweensOf(this.$refs.preview);
    gsap.killTweensOf(this.$refs.img);

    const show = gsap.timeline({
      onStart: () => {
        this.$refs.preview.style.opacity = '1';
        gsap.set(this.$refs.preview, {zIndex: 0});
      }
    })
      .to(this.$refs.img, {
        duration: 0.5,
        autoAlpha: 1,
        ease: 'none',
        scale: '1'
      })
  }
  private hideImage(): void {
    gsap.killTweensOf(this.$refs.preview);
    gsap.killTweensOf(this.$refs.img);

    gsap.set(this.$refs.preview, {
      zIndex: -1,
      opacity: 0
    });
    gsap.set(this.$refs.img, {
      scale: 1.05,
      autoAlpha: 0
    });
  }
  private runWave(): void {
    const turbwave = this.$refs.preview.querySelector('#turbwave')
    gsap.killTweensOf(turbwave);

    gsap.to(turbwave, {
        duration: 4,
        attr:{"baseFrequency": 0},
      }
    )
  }
  private stopWave(): void {
    const turbwave = this.$refs.preview.querySelector('#turbwave')
    gsap.killTweensOf(turbwave);

    gsap.set(turbwave, {
        attr:{"baseFrequency": 0.01},
      }
    )
  }
}
</script>

<style lang="sass">
@import '../assets/styles/setup'

.section-second
  position: relative
  z-index: 2
  padding: 25vh 6.25vw
  background-color: $c-grey

  .project
    padding: 5vh 0
    width: fit-content
    user-select: none

    +rmin(1024)
      padding: 0 0 100px

  .preview
    position: fixed
    top: 0
    left: 0
    z-index: -1
    padding-right: 6.25vw
    width: 100%
    height: 100%
    display: flex
    align-items: center
    justify-content: flex-end
    opacity: 0
    pointer-events: none

    .preview-svg
      width: 42.8587vw
      height: auto
      transform: scale(1.05)
      opacity: 0

    .filter-svg
      position: absolute
</style>
