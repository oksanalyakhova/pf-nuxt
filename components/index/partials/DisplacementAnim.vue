<template lang="pug">
  //:style="{width: `${cw}px`, height: `${ch}px`}"
  .canvas-wrap(
    ref="canvasWrap"
  )
</template>

<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger.js';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

@Component({
  props: {
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      cw: this.width,
      ch: this.height
    }
  }
})

export default class DisplacementAnim extends Vue {
  mounted() {
    this.$nextTick(() => {
      this.setSizes();
      this.runPixi();

      window.addEventListener('resize', this.setSizes);
    })
  }
  destroyed() {
    window.removeEventListener('resize', this.setSizes);
  }
  setSizes() {
    this.cw = this.width;
    this.ch = this.height;
  }

  runPixi() {
    const img = 'img/o.png';
    const displacement = 'img/displacement.jpg';
    const w = 516;
    const h = 542;

    const application = new PIXI.Application({
      autoResize: true,
      resolution: devicePixelRatio,
      clearBeforeRender: true,
      width: w,
      height: h,
      backgroundColor: 0x000000,
    });

    this.$refs.canvasWrap.appendChild(application.view);

    application.stage.interactive = true;
    application.renderer.resize(w, h)
    application.render()

    const container = new PIXI.Container();
    application.stage.addChild(container);

    const helloImg = PIXI.Sprite.from(img);
    container.addChild(helloImg);
    helloImg.x = 0;
    helloImg.y = 0;

    const displacementSprite = PIXI.Sprite.from(displacement);
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
    displacementFilter.padding = 10;
    displacementSprite.position = helloImg.position;

    application.stage.addChild(displacementSprite);

    helloImg.filters = [displacementFilter];

    application.ticker.add(() => {
      displacementSprite.x++;
      if (displacementSprite.x > displacementSprite.width) { displacementSprite.x = 0; }
    });

    // gsap
    // gsap.set(displacementFilter.scale,{x: 100,y: 200});
    //
    // gsap.to(displacementFilter.scale,{
    //   x: 40,
    //   y: 10,
    //   duration: 2,
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: refSectionFirst.current,
    //     pin: true,
    //     scrub: 0.3,
    //     start: "top top",
    //     end: "+=3000"
    //   }
    // });


    return () => {
      application.destroy(true);
    };
  }
}
</script>

<style lang="sass">
@import '../../../assets/styles/setup'

.canvas-wrap
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
</style>
