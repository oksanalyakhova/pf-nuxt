<template lang="pug">
  main.main
    Preview
    Projects(
      :projects="projects"
      v-if="projects"
    )

    Motion
</template>

<script>
import Vue from 'vue';
import Preview from '../components/index/Preview';
import Projects from '../components/index/Projects';
import Motion from '../components/index/partials/Motion';
import Component from 'vue-class-component'

@Component({
  components: {
    Preview,
    Projects,
    Motion
  }
})
export default class index extends Vue {
  projects = []

  created() {
    fetch('https://raw.githubusercontent.com/oksanalyakhova/pf-nuxt/main/static/data/projects.json')
      .then(res => res.json())
      .then(projects => {
        this.projects.push(...projects)
      })
  }
}
</script>

<style>

</style>
