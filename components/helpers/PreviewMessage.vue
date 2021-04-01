<template lang="pug">
  fragment
    a.preview-message(
      v-if="theme === 'link'"
      :class="[className, classObject]"
      :href="`javascript:;`"
    ) {{message}}
    .preview-message(
      v-else-if="theme === 'text'"
      :class="classObject"
    ) {{message}}
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component
export default class ScrollMessage extends Vue {
  @Prop({default: () => {}})
  className: object
  @Prop({default: () => {}})
  message: object
  @Prop({default: ''})
  theme: string

  get classObject() {
    return {
      'is-link': this.theme === 'link',
      'is-text': this.theme === 'text'
    }
  }
}
</script>

<style lang="sass">
@import '../../assets/styles/setup'

.preview-message
  font-size: clamp(1.5rem, 3vw, 20rem)
  color: $c-sand

  &.is-text
    @include center(h)
    bottom: -.35em
    z-index: 0
    pointer-events: none

  &.is-active
    color: $c-grey
</style>
