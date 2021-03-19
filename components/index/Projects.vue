<template lang="pug">
  .projects
    ul.projects-list
      ProjectItem(
        v-for="project in projects"
        :key="project.id"
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
    // className: {
    //   type: String,
    //   default: ''
    // },
    // theme: {
    //   type: String,
    //   default: 'dark'
    // },
  },
  data() {
    return {
      // vw: window.innerWidth,
      // vh: window.innerHeight
    }
  }
})
export default class Projects extends Vue {
  // get classObject() {
  //   return {
  //     'is-dark': this.theme === 'dark',
  //     'is-light': this.theme === 'light',
  //     'is-transparent': this.theme === 'transparent'
  //   }
  // }
  // created() {
  //
  // mounted() {
  //
  // }


}
</script>

<style lang="sass">
@import '../../assets/styles/setup'


</style>
