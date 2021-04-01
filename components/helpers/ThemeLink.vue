<template lang="pug">
  a.theme-link(
    :class="[className, classObject]"
    :href="href"
    target="_blank"
    rel="nofollow"
  ) {{name}}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component
export default class ThemeLink extends Vue {
  @Prop({default: ''})
  href: string

  @Prop({default: ''})
  name: string

  @Prop({default: ''})
  className: string

  @Prop({default: 'dark'})
  theme: string

  get classObject() {
    return {
      'is-dark': this.theme === 'dark',
      'is-light': this.theme === 'light'
    }
  }
}

</script>
