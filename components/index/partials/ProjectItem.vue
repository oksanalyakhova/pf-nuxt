<template lang="pug">
  a.project__link(
    :href="project.href"
    :data-img="project.preview"
    target="_blank"
    rel="nofollow"
    @mouseenter="Enter"
    @mouseleave="Leave"
  )
    h2.project-title(
      :data-project="project.label"
    ) {{project.titleStart}}
      span.stroke {{project.titleEnd}}
      span.fill(
        ref="fill"
      ) {{project.titleEnd}}
    .project-info(
      ref="projectInfo"
    ) {{project.info}}
</template>

<script>
import Component, {mixins} from 'vue-class-component';
import {gsap} from 'gsap/dist/gsap';
import deviceDetector from '@/mixins/deviceDetector';
import utils from '@/mixins/utils';

@Component({
  props: {
    project: {
      type: Object,
      default: () => {}
    }
  }
})
export default class ProjectItem extends mixins(deviceDetector, utils) {
  images = [
    'img/projects/1.png',
    'img/projects/2.png',
    'img/projects/3.png',
    'img/projects/4.png',
    'img/projects/5.png'
  ];
  mousepos = {x: 0, y: 0};
  mousePosCache = this.mousepos;
  direction = {x: this.mousePosCache.x-this.mousepos.x, y: this.mousePosCache.y-this.mousepos.y};
  reveal = document.createElement('div');
  revealInner = document.createElement('div');
  revealImage = document.createElement('div');
  bounds = {}
  mounted() {
    this.setStyles();
  }
  setStyles() {
    gsap.set(this.$refs.fill, {
      webkitClipPath: 'inset(0% 100% 0% 0%)',
      clipPath: 'inset(0% 100% 0% 0%)'
    })

    if (this.isMobile) {
      gsap.set(this.$refs.projectInfo, {
        autoAlpha: 1
      })
    }
  }
  Enter(e) {
    if (!this.isMobile) {
      this.Hover(
        e.target.querySelector('.fill'),
        e.target.querySelector('.project-info'),
        'inset(0% 0% 0% 0%)',
        1
      )
    }
    console.log(e.fromElement.children)
  }
  Leave(e) {
    if (!this.isMobile) {
      this.Hover(
        e.target.querySelector('.fill'),
        e.target.querySelector('.project-info'),
        'inset(0% 100% 0% 0%)',
        0
      )
    }
  }
  Hover(targetFill, targetInfo, clipPath, autoAlpha) {
    const hoverAnim = gsap.timeline()
      .to(targetFill, {
        webkitClipPath: clipPath,
        clipPath: clipPath,
        duration: 0.45,
        ease: 'none'
      }, 'spin')
      .to(targetInfo, {
        autoAlpha: autoAlpha,
        duration: 0.15,
        ease: 'none'
      }, 'spin')
  }
  layout(img) {
    this.reveal.className = 'hover-reveal';
    this.revealInner.className = 'hover-reveal__inner';
    this.revealImage.className = 'hover-reveal__img';
    this.revealImage.style.backgroundImage = `url(img/projects/ + ${img} + png)`;

    this.revealInner.appendChild(this.revealImage);
    this.reveal.appendChild(this.revealInner);
    document.el.appendChild(this.reveal);
  }
  // calcBounds() {
  //   this.bounds = {
  //     el: document.el.getBoundingClientRect(),
  //     reveal: this.reveal.getBoundingClientRect()
  //   }
  // }
  // initEvents() {
  //   this.mouseenterFn = (ev) => {
  //     this.showImage();
  //     this.firstRAFCycle = true;
  //     this.loopRender();
  //   };
  //   this.mouseleaveFn = () => {
  //     this.stopRendering();
  //     this.hideImage();
  //   };
  //
  //   document.el.addEventListener('mouseenter', this.mouseenterFn);
  //   document.el.addEventListener('mouseleave', this.mouseleaveFn);
  // }
  //

  showImage() {
    gsap.killTweensOf(this.revealInner);
    gsap.killTweensOf(this.revealImage);

    const show = gsap.timeline({
      onStart: () => {
        this.reveal.style.opacity = 1;
        gsap.set(document.el, {zIndex: this.images.length});
      }
    })
      .to(this.revealInner, {
        duration: 0.2,
        ease: 'none',
        startAt: {
          x: this.direction.x < 0 ? '-100%' : '100%'
        },
        x: '0%'
      })
      .to(this.revealImage, {
        duration: 0.2,
        ease: 'none',
        startAt: {
          x: this.direction.x < 0 ? '100%': '-100%'
        },
        x: '0%'
      }, 0);
  }
  hideImage() {
    gsap.killTweensOf(this.revealInner);
    gsap.killTweensOf(this.revealImage);

    const hide = gsap.timeline({
      onStart: () => {
        gsap.set(document.el, {zIndex: 1});
      },
      onComplete: () => {
        gsap.set(this.reveal, {opacity: 0});
      }
    })
      .to(this.revealInner, {
        duration: 0.2,
        ease: 'none',
        x: this.direction.x < 0 ? '100%' : '-100%'
      })
      .to(this.revealImage, {
        duration: 0.2,
        ease: 'none',
        x: this.direction.x < 0 ? '-100%' : '100%'
      }, 0);
  }
}
</script>

<style lang="sass">
@import '../../../assets/styles/setup'

.project
  &__link
    position: relative
    width: fit-content
    color: $c-black

    .project-title
      margin: 0
      position: relative
      display: inline-block
      font-weight: normal
      font-size: clamp(2.25rem, 6vw, 60rem)
      line-height: 1.25
      letter-spacing: .05em
      -webkit-text-stroke-width: 1px
      -webkit-text-stroke-color: $c-black

      .stroke
        color: transparent
        -webkit-text-fill-color: transparent

      .fill
        position: absolute
        top: 0
        right: 0

    .project-info
      position: absolute
      left: 0
      top: 100%
      opacity: 0
      user-select: none
      font-weight: bold
      font-size: 12px
      line-height: 1.6667
      text-transform: uppercase
      white-space: nowrap
</style>
