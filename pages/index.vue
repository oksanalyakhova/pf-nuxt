<template lang="pug">
  div.app__wrapper
    Preview
    Projects(
      :projects="projects"
      v-if="projects"
    )
    Js(
      :reactProjects="reactProjects"
      v-if="reactProjects"
    )
    //About
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Preview from '~/components/Preview.vue';
import Projects from '~/components/Projects.vue';
import Js from '~/components/Js.vue';
import About from '~/components/About.vue';

@Component({
  components: {
    Preview,
    Projects,
    Js,
    About
  }
})
export default class index extends Vue {
  projects = [];
  reactProjects = [];



  async created() {
    fetch(this.$t('projects.url'))
      .then(res => res.json())
      .then(projects => {
        this.projects.push(...projects)
      })
    fetch(this.$t('react-projects.url'))
      .then(res => res.json())
      .then(reactProjects => {
        this.reactProjects.push(...reactProjects)
      })
  }
}
</script>
