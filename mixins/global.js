import Vue from 'vue';
import Component from 'vue-class-component';
import imagesLoaded from 'imagesloaded';

@Component
export default class Mixin extends Vue {
  isMobile = false;

  mounted() {
    this.deviseDetector();

    this.preloadImages().then(() => {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    });

    // refresh on top
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // if targets don't exist
    // this.$gsap.config({nullTargetWarn:false});
  }

  deviseDetector() {
    this.isMobile = 'ontouchstart' in window || navigator.maxTouchPoints;
    this.isMobile ? document.body.classList.add('mobile') : document.body.classList.add('desktop');
  }

  preloadImages() {
    return new Promise((resolve, reject) => {
      imagesLoaded(document.querySelectorAll('img'), resolve);
    });
  }
}
