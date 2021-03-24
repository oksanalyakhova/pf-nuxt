<template lang="pug">
  .projects
    ul.projects-list
      li.project(
        v-for="project in projects"
        :key="project.label"
        :data-img="project.preview"
        @mouseenter="Enter"
        @mouseleave="Leave"
      )
        ProjectItem(
          :project="project"
        )
    Reveal(
      :img="image"
      :show="showImg"
      :y="offsetY"
    )
</template>

<script>
import Component, {mixins} from 'vue-class-component';
import ProjectItem from './partials/ProjectItem';
import Reveal from './partials/Reveal';
import deviceDetector from '@/mixins/deviceDetector';

@Component({
  components: {
    ProjectItem,
    Reveal
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
      showImg: false,
      offsetY: 0
    }
  }
})
export default class Projects extends mixins(deviceDetector) {
  Enter(e) {
    if (!this.isMobile) {
      this.image = e.target.dataset.img;
      this.showImg = true;
      this.offsetY = e.target.offsetTop;
    }
  }
  Leave(e) {
    if (!this.isMobile) {
      this.showImg = false;
      this.offsetY = 0;
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/styles/setup'

.projects
  position: relative
  padding: 30vh 6.25vw
  background-color: $c-grey

  .project
    padding: 0 0 10vw
    width: fit-content
    user-select: none

    +rmin(1024)
      padding: 0 0 100px
</style>
