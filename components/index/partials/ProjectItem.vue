<template lang="pug">
  li.project__item
    a.project__link(
      :href="project.href"
      target="_blank"
      rel="nofollow"
    )
      h2.project-title(
        data-project="project.label"
      ) {{project.titleStart}}
        span.stroke {{project.titleEnd}}
        span.fill {{project.titleEnd}}
      .project-info {{project.info}}
</template>

<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  props: {
    project: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {

    }
  }
})
export default class ProjectItem extends Vue {

}
</script>

<style lang="sass">
@import '../../../assets/styles/setup'


</style>
