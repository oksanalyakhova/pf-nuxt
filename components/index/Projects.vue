<template lang="pug">
  .projects
    .projects-trigger(
      ref="projectsTrigger"
    )
    ul.projects-list(
      ref="projects"
    )
      li.project(
        ref="project"
        v-for="project in projects"
        :key="project.label"
      )
        ProjectItem(
          :project="project"
        )
</template>

<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import ProjectItem from './partials/ProjectItem';
import {gsap} from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

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
      vh: window.innerHeight
    }
  }
})
export default class Projects extends Vue {
  created() {
    this.setWindowSizes();
  }
  mounted() {
    this.$nextTick(() => {
      this.scrollAnim();
      window.addEventListener('resize', this.setWindowSizes);
    })
  }
  destroyed() {
    window.removeEventListener('resize', this.setWindowSizes);
  }
  setWindowSizes() {
    this.vh = window.innerHeight;
  }
  scrollAnim() {
    // const actionStart = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: this.$refs.projectsTrigger,
    //     pin: true,
    //     scrub: 0.3,
    //     start: "top 25%",
    //     end: '+=' + this.vh,
    //     invalidateOnRefresh: true
    //   }
    // })
    //   .to(this.$refs.projects, {
    //     y: -100,
    //     duration: 1,
    //     ease: 'none'
    //   }, 'spin')
    //
    // window.addEventListener('resize', () => {
    //   ScrollTrigger.refresh()
    // });
  }
}
</script>

<style lang="sass">
@import '../../assets/styles/setup'

.projects
  position: relative
  padding: 30vh 6.25vw
  background-color: $c-grey

  .projects-trigger
    position: absolute
    left: 0
    top: -200vh
    width: 100%
    height: 2px
    background-color: red

  .project
    margin: 0 0 10vw
    user-select: none

    +rmin(1024)
      margin: 0 0 100px
</style>
