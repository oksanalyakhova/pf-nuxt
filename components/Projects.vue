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
      svg.filter-svg(width="538" height="190" viewBox="0 0 600 200")
        defs
          filter(id="turb")
            feTurbulence(
              ref="turbwave"
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
import Component, {mixins} from 'vue-class-component';
import ProjectItem from './partials/ProjectItem';
import deviceDetector from '@/mixins/deviceDetector';
import gsap from 'gsap';

@Component({
  components: {
    ProjectItem
  },
  props: {
    projects: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      image: '',
      play: false,
      reverse: false
    }
  }
})
export default class Projects extends mixins(deviceDetector) {
  Enter(e) {
    if (!this.isMobile) {
      this.image = e.target.dataset.img;
      this.runWave();
      this.showImage();
    }
  }
  Leave(e) {
    if (!this.isMobile) {
      this.stopWave();
      this.hideImage();
    }
  }
  showImage() {
    gsap.killTweensOf(this.$refs.preview);
    gsap.killTweensOf(this.$refs.img);

    const show = gsap.timeline({
      onStart: () => {
        this.$refs.preview.style.opacity = 1;
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
  hideImage() {
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
  runWave() {
    gsap.killTweensOf(this.$refs.turbwave);

    gsap.to(this.$refs.turbwave, {
        duration: 4,
        attr:{"baseFrequency": 0},
      }
    )
  }
  stopWave() {
    gsap.killTweensOf(this.$refs.turbwave);

    gsap.set(this.$refs.turbwave, {
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
