import imagesLoaded from 'imagesloaded';
import {Component, Vue} from 'vue-property-decorator';

@Component
class Mixin extends Vue {
  isMobile: boolean | number = false;
  directives: object = {
    scroll: {
      inserted(el: any, binding: { value: (arg0: any, arg1: any) => any; }): void {
        let f = (evt: any) => {
          if (binding.value(evt, el)) {
            window.removeEventListener('scroll', f);
          }
        };
        window.addEventListener('scroll', f);
      }
    }
  }
  deviseDetector(): void {
    this.isMobile = 'ontouchstart' in window || navigator.maxTouchPoints;
    this.isMobile ? document.body.classList.add('mobile') : document.body.classList.add('desktop');
  }
  sizesTrick(): void {
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  }
  preloadImages() {
    return new Promise((resolve, reject) => {
      imagesLoaded(document.querySelectorAll('img'), resolve);
    });
  }
  mounted() {
    this.deviseDetector();
    this.sizesTrick();
    this.$nextTick(() => {
      window.addEventListener('resize', this.sizesTrick);
    })
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
  destroyed() {
    window.removeEventListener('resize', this.sizesTrick);
  }
}

export default Mixin;
