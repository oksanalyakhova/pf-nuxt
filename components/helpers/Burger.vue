<template lang="pug">
  .burger
    span(v-if="isClose") 🍔
    span(v-if="isOpen") 🍔
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({})
export default class Burger extends Vue {
  isClose = true;
  isOpen = false;
  // @Prop({ type: String, default: '' })
  // href!: string
}
</script>

<style scoped lang="sass">

</style>
