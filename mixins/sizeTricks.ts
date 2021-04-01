import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class sizeTricks extends Vue {
  vh: number = window.innerHeight * 0.01;
  vw: number = window.innerWidth * 0.01;

  mounted() {
    this.SizesTrick();

    window.addEventListener("resize", () => {
      this.SizesTrick();
    });
  }
  SizesTrick() {
    this.vh = window.innerHeight * 0.01;
    this.vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vh", `${this.vh}px`);
    document.documentElement.style.setProperty("--vw", `${this.vw}px`);
  }
}
