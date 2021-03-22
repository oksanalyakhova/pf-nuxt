<template lang="pug">
  .text.text-letters(
    ref="textLetters"
    :class="classObject"
    ) {{text}}
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component'

@Component({
  props: {
    text: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: ''
    }
  }
})
export default class Splitting extends Vue {
  get classObject() {
    return {
      'text_uppercase': this.theme === 'uppercase'
    }
  }
  mounted() {
    const words = this.$refs.textLetters;
    words.innerHTML = words.innerText
      .replace(/./g, "<span class='letter' data-letter='$&'>$&</span>")
      .replace(/\s/g, " ");
  }
}
</script>

<style lang="sass">
.text-letters
  .letter
    position: relative
    display: inline-block
    text-rendering: geometricPrecision
    will-change: transform
</style>
