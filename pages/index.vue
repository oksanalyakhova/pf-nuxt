<template lang="pug">
  div.app__wrapper
    Preview
    Projects(
      :projects="projects"
      v-if="projects"
    )
    React(
      :reactProjects="reactProjects"
      v-if="reactProjects"
    )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Preview from '~/components/Preview.vue';
import Projects from '~/components/Projects.vue';
import React from '@/components/Js.vue';
import axios from 'axios';
// const axios = require('axios');

@Component({
  components: {
    Preview,
    Projects,
    React
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
