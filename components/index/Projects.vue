<template lang="pug">
  .projects
    ul.projects-list
      ProjectItem(
        :project="project"
        v-for="project in projects"
        :key="project.label"
      )
</template>

<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
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
  padding: 0 6.25vw 50vh
  background-color: $c-grey

</style>
