<template lang="pug">
  .projects
    ul.projects-list
      li.project(
        v-for="project in projects"
        :key="project.label"
      )
        ProjectItem(
          :project="project"
        )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component'
import ProjectItem from './partials/ProjectItem';

@Component({
  components: {
    ProjectItem
  },
  props: {
    projects: {
      type: Array,
      default: () => []
    },
  }
})
export default class Projects extends Vue {}
</script>

<style lang="sass">
@import '../../assets/styles/setup'

.projects
  position: relative
  padding: 30vh 6.25vw
  background-color: $c-grey

  .project
    margin: 0 0 10vw
    user-select: none

    +rmin(1024)
      margin: 0 0 100px
</style>
