<template lang="pug">
  div.app__wrapper
    Preview
    Projects(
      :projects="projects"
      v-if="projects"
    )
    React
    //Motion
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Preview from '../components/Preview';
import Projects from '../components/Projects';
import React from '../components/React';
// import Motion from '../components/index/partials/Motion';

@Component({
  components: {
    Preview,
    Projects,
    React,
    // Motion
  }
})
export default class index extends Vue {
  projects = []

  created() {
    fetch(this.$t('projects.url'))
      .then(res => res.json())
      .then(projects => {
        this.projects.push(...projects)
      })
  }
}
</script>

<style>

</style>
