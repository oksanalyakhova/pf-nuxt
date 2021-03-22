import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class sizeTricks extends Vue {
  mounted() {
    this.SizesTrick();

    window.addEventListener("resize", () => {
      this.SizesTrick();
    });
  }
  SizesTrick() {
    let vh = window.innerHeight * 0.01;
    let vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }
}
