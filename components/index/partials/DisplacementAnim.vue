<template lang="pug">
  .canvas-wrap(
    ref="canvasWrap"
  )
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component'
import {gsap} from 'gsap';

@Component
export default class DisplacementAnim extends Vue {
  mounted() {
    this.$nextTick(() => {
      this.runPixi();
    })
  }

  load(animTarget) {
    const loadingStart = gsap.timeline()
      .to(animTarget, {
        x: 50,
        y: 30,
        duration: 5,
        delay: 0.5,
        ease: "none",
      })
  }

  mouse(target, animTarget) {
    let mouseIn = false;
    target.on('mouseover', (e) => {
      mouseIn = true;
    })
    target.on('mouseout', (e) => {
      mouseIn = false;

      gsap.to(animTarget, {
        x: 50,
        y: 30,
        ease: "none",
      })
    })
    target.on('mousemove', (e) => {
      if (mouseIn) {
        let x = e.data.global.x;

        gsap.to(animTarget, {
          x: x / 4,
          y: 30,
          ease: "none",
        })
      }
    })
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

    // window on load
    window.addEventListener('load', this.load(displacementFilter.scale));

    // mouse actions
    this.mouse(application.stage, displacementFilter.scale);

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
