import Vue from 'vue';
import Component from 'vue-class-component';
import {Events} from '../events';
import * as THREE from 'three';
import gsap from 'gsap';

@Component({
  data() {
    return {
      loader: {},
      scene: {},
      camera: {},
      renderer: {},
      clock: {},
      controls: {},
      texture: {},
      mesh: {}
    }
  }
})
export default class Index extends Vue {
  mounted() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.z = 50;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    this.renderer.setPixelRatio(gsap.utils.clamp(1.5, 1, window.devicePixelRatio));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xF2F2F2, 0);

    this.clock = new THREE.Clock();

    this.init();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  run = ({ current }) => {
    let elapsed = this.clock.getElapsedTime();

    for (let i = 0; i < this.scene.children.length; i++) {
      const plane = this.scene.children[i];
      plane.updatePosition(current);
      plane.updateTime(elapsed);
    }

    this.render();
  }

  addEvents() {
    Events.on('tick', this.run);
    Events.on('resize', this.resize);
  }

  init() {
    this.addToDom();
    this.addEvents();
  }

  addToDom() {
    const canvas = this.renderer.domElement;
    canvas.classList.add('dom-gl');
    document.body.appendChild(canvas);
  }

  resize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.updateProjectionMatrix();

    for (let i = 0; i < this.scene.children.length; i++) {
      const plane = this.scene.children[i];
      plane.resize();
    }
  }
}
