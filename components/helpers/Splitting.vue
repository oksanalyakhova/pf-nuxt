<template lang="pug">
  .text.text-letters(
    ref="textLetters"
    :class="classObject"
    ) {{text}}
</template>

<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component({
  props: {
    text: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: ''
    },
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
      .replace(/./g, "<span class='letter-wrap'><span class='letter' data-letter='$&'>$&</span></span>")
      .replace(/\s/g, " ");
  }
}
</script>

<style lang="sass">
.text-letters
  .letter-wrap
    overflow: hidden

    .letter
      position: relative
      transform: translateX(0)
      transition: transform 1s cubic-bezier(1, .15, .25, 1)
      transition-delay: 0s
      will-change: transform
</style>
