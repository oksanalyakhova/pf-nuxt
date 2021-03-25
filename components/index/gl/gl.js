import Vue from 'vue';
import Component from 'vue-class-component';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import glsl from 'glslify';
import {gsap} from 'gsap';

const vertexShader = `
    precision mediump float;

    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform float uProg;

    // #pragma glslify: noise = require(glsl-noise/simplex/3d)

    void main() {
      vec3 pos = position;

      // pos.z += noise(vec3(pos.x * 4. + uTime, pos.y, 0.)) * uProg;
      vWave = pos.z;
      pos.z *= 3.;

      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
    }
  `

const fragmentShader = `
    precision mediump float;

    varying vec2 vUv;
    varying float vWave;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uProg;

    void main() {
      vec2 uv = vUv;
      vec2 dUv = vec2(uv.x, uv.y);
      // vec3 texture;

      float w = vWave;
      float r = texture2D(uTexture, dUv + vec2(0., 0.) + uProg * w * 0.05).r;
      float g = texture2D(uTexture, dUv + vec2(0., 0.) + uProg * w * 0.0).g;
      float b = texture2D(uTexture, dUv + vec2(0., 0.) + uProg * w * -0.02).b;
      vec3 texture = vec3(r, g, b);
      gl_FragColor = vec4(texture, 1.);
    }

  `

@Component
export default class Gl extends Vue {
  img = 'img/o.png';

  loader = {};
  scene = {};
  camera = {};
  renderer = {};
  clock = {};
  controls = {};
  texture = {};
  mesh = {};

  mounted() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector(".canvas"),
      antialias: true
    });

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
    this.material = new THREE.ShaderMaterial({
      vertexShader: glsl(vertexShader),
      fragmentShader: glsl(fragmentShader),
    });
    this.loader = new THREE.TextureLoader();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.camera = new THREE.PerspectiveCamera(
    //   45,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   100
    // );
    // this.renderer = new THREE.WebGLRenderer({
    //   canvas: document.querySelector(".canvas"),
    //   antialias: true
    // });
    // this.clock = new THREE.Clock();
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //
    // this.camera.position.z = 1;
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.setClearColor(0x000000, 1);

    this.onResize();
    this.init();
  }

  init() {
    this.camera.position.z = 1;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 1);

    this.material.uniforms = {
      uTexture: { value: 0 },
      uTime: { value: 0 },
      uProg: { value: 0 },
    }

    this.texture = this.loader.load(this.img, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;

      this.material.uniforms.uTexture.value = texture;
    })

    this.scene.add(this.mesh);
    // Gl.scene.add(this);

    this.addEvents();
  }

  updateTime(time) {
    this.material.uniforms.uTime.value = time;
  }

  addEvents() {
    window.requestAnimationFrame(this.run.bind(this));
    window.addEventListener("resize", this.onResize.bind(this), false);

    // this.mouseEnter();
    // this.mouseLeave();

    console.log(this.renderer)
  }

  run() {
    requestAnimationFrame(this.run.bind(this));
    this.renderCanvas();
  }

  renderCanvas() {
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(w, h);
  }

  mouseEnter() {
    this.el.addEventListener('mouseenter', () => {
      gsap.to(this.material.uniforms.uProg, {
        // duration: 1,
        value: 1,
        ease: 'power.inOut',
      });
    });
  }

  mouseLeave() {
    this.el.addEventListener('mouseleave', () => {
      gsap.to(this.material.uniforms.uProg, {
        // duration: 1,
        value: 0,
        ease: 'power.inOut',
      });
    });
  }
}
