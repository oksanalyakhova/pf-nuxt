import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class deviceDetector extends Vue {
  isMobile = false;
  mounted() {
    this.deviceDetector();
  }
  deviceDetector() {
    if ('ontouchstart' in window || navigator.maxTouchPoints) this.isMobile = true;
  }
}
