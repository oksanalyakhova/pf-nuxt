<template lang="pug">
  main.main
    Preview
</template>

<script>
import Vue from 'vue'
import Preview from '../components/index/Preview'
import {Component} from 'vue-property-decorator';

@Component({
  components: {
    Preview
  }
})
export default class index extends Vue {}
</script>

<style>

</style>
