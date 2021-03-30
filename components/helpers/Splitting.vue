<template lang="pug">
  .text.text-letters(
    ref="textLetters"
    :class="classObject"
    ) {{text}}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component
export default class Splitting extends Vue {
  @Prop({default: ''})
  text: string
  @Prop({default: ''})
  theme: string

  $refs!: {
    textLetters: HTMLElement
  }

  get classObject() {
    return {
      'text_uppercase': this.theme === 'uppercase'
    }
  }
  mounted() {
    this.SetInnerText();
  }
  private SetInnerText(): void {
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
