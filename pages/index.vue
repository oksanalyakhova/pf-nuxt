<template lang="pug">
  div.app__wrapper
    Preview
    Projects(
      :projects="projects"
      v-if="projects"
    )
    React
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Preview from '~/components/Preview.vue';
import Projects from '~/components/Projects.vue';
import React from '~/components/React.vue';

@Component({
  components: {
    Preview,
    Projects,
    React
  }
})
export default class index extends Vue {
  projects = [];

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
