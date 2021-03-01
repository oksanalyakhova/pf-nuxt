<template lang="pug">
  main.main
    First
</template>

<script>
import Vue from 'vue'
import First from '../components/index/First'
import {Component} from 'vue-property-decorator';

@Component({
  components: {
    First
  }
})
export default class index extends Vue {}
</script>

<style>

</style>
