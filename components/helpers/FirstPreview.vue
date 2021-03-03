<template lang="pug">
  .section-first__preview(ref="canvasBox")
    img(
      :src="`img/o.png`"
      ref="image"
    )

</template>

<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import * as THREE from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass';

@Component
export default class FirstPreview extends Vue {

  data() {
    const myEffect = {
      uniforms: {
        "tDiffuse": {value: null},
        "resolution": {value: new THREE.Vector2(1.,window.innerHeight/window.innerWidth)},
        "uMouse": {value: new THREE.Vector2(-10,-10)},
        "uVelo": {value: 0},
      },
      vertexShader: `varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 );}`,
      fragmentShader: `uniform float time;
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        varying vec2 vUv;
        uniform vec2 uMouse;
        float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
          uv -= disc_center;
          uv*=resolution;
          float dist = sqrt(dot(uv, uv));
          return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);
        }
        void main()  {
            vec2 newUV = vUv;
            float c = circle(vUv, uMouse, 0.0, 0.2);
            float r = texture2D(tDiffuse, newUV.xy += c * (0.1 * .05)).x;
            float g = texture2D(tDiffuse, newUV.xy += c * (0.1 * .325)).y;
            float b = texture2D(tDiffuse, newUV.xy += c * (0.1 * .055)).z;
            vec4 color = vec4(r, g, b, 1.);
            gl_FragColor = color;
        }`
    }

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({antialias: true});

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const customPass = new ShaderPass(myEffect);

    // const image = document.createElement('img');
    // const texture = new THREE.Texture(image);

    const image = document.createElement('img');
    image.src = 'img/hoodie.jpg';
    const texture = new THREE.Texture(image);

    image.onload = function () {
      texture.needsUpdate = true;
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
    };

    const geometry = new THREE.PlaneGeometry(0.3, 0.3);
    const material = new THREE.MeshBasicMaterial({
      map: texture
    });
    const mesh = new THREE.Mesh(geometry, material);
    const uMouse = new THREE.Vector2(0,0);

    return {
      camera: camera,
      scene: scene,
      renderer: renderer,
      composer: composer,
      renderPass: renderPass,
      customPass: customPass,
      texture: texture,
      geometry: geometry,
      material: material,
      mesh: mesh,
      uMouse: uMouse
    }
  }

  created() {
    this.camera.position.z = 0.5;
    this.scene.background = new THREE.Color('hsl(0, 0%, 13%)');
    this.scene.add(this.mesh);
    // this.image.src = 'img/hoodie.jpg';
    // this.texture.generateMipmaps = false;
    // this.texture.minFilter = THREE.LinearFilter;
    // this.texture.needsUpdate = true;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.composer.addPass(this.renderPass);
    this.customPass.renderToScreen = true;
    this.composer.addPass(this.customPass);
  }

  mounted() {
    this.$refs.canvasBox.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    this.customPass.uniforms.uMouse.value = this.uMouse;
    requestAnimationFrame(this.animate);

    this.composer.render();

    document.addEventListener('mousemove', (e) => {
      // mousemove / touchmove
      this.uMouse.x = (e.clientX / window.innerWidth);
      this.uMouse.y = 1. - (e.clientY/ window.innerHeight);
    });
  }
}
</script>

<style lang="sass">

.section-first__preview
  width: 100%
  height: 100vh
  height: calc(var(--vh, 1vh) * 100)
  display: flex
  justify-content: center
  align-items: center

  img
    display: none

</style>
