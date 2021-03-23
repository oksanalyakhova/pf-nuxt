<template lang="pug">
  .hover-reveal(
    ref="reveal"
  )
    .hover-reveal__inner(
      ref="revealInner"
    )
      .hover-reveal__img(
        ref="revealImg"
        :style="{'background-image': 'url(' + img + ')'}"
      )
</template>

<script>
import Component, {mixins} from 'vue-class-component';
import {gsap} from 'gsap/dist/gsap';
import utils from '@/mixins/utils';

@Component({
  props: {
    img: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    y: {
      type: Number,
      default: 0
    }
  }
})
export default class Reveal extends mixins(utils) {
  mousePos = {x: 0, y: 0};
  mousePosCache = this.mousePos;
  direction = {
    x: this.mousePosCache.x - this.mousePos.x,
    y: this.mousePosCache.y - this.mousePos.y};

  mounted() {
    window.addEventListener('mousemove', (e) => {
      this.mousePos = this.getMousePos(e);
      this.runImage();
    });
  }
  runImage() {
    this.show
      ? this.showImage()
      : this.hideImage();
  }
  showImage() {
    gsap.killTweensOf(this.$refs.revealInner);
    gsap.killTweensOf(this.$refs.revealImage);

    const show = gsap.timeline({
      onStart: () => {
        this.$refs.reveal.style.opacity = 1;
        gsap.set(this.$refs.reveal, {zIndex: 0});
      }
    })
      .to(this.$refs.revealInner, {
        duration: 0.3,
        ease: 'none',
        x: this.mousePos.x - this.$refs.reveal.clientWidth,
        y: this.y
      })
  }
  hideImage() {
    gsap.killTweensOf(this.$refs.revealInner);
    gsap.killTweensOf(this.$refs.revealImage);

    gsap.set(this.$refs.reveal, {
      zIndex: -1,
      opacity: 0
    });
  }
}
</script>

<style lang="sass">
@import '../../../assets/styles/setup'

.hover-reveal
  position: absolute
  top: 0
  right: 6.25vw
  z-index: -1
  width: 40vw
  aspect-ratio: 16 / 9
  pointer-events: none
  opacity: 0
  mix-blend-mode: multiply

  &__inner,
  &__img
    position: relative
    width: 100%
    height: 100%

  &__inner
    overflow: hidden

  &__img
    background-size: cover
    background-position: 50% 50%
</style>
