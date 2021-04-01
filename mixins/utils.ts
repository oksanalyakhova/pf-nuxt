import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class utils extends Vue {
  map(x: number, a: number, b: number, c: number, d: number) {
    return (x - a) * (d - c) / (b - a) + c;
  }
  lerp(a: number, b: number, n: number) {
    return (1 - n) * a + n * b;
  }
  clump(num: number, min: number, max: number) {
    return num <= min ? min : num >= max ? max : num;
  }
  getMousePos(e: MouseEvent) {
    let posx = 0;
    let posy = 0;
    if (!e) e = <MouseEvent>window.event;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    }
    else if (e.clientX || e.clientY)    {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { x : posx, y : posy }
  }
}
