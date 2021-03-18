<template lang="pug">
  .frame(
    ref="frame"
  )
    img.img(
      :src="`img/o.png`"
      ref="image"
    )
</template>

<script>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {
  Renderer,
  Camera,
  Transform,
  Geometry,
  Texture,
  Program,
  Mesh,
  Orbit,
  Text
} from 'ogl/src/index.mjs';

@Component({
  data() {
    return {
      vw: window.innerWidth,
      vh: window.innerHeight,
      imgSize: [516, 542]
    }
  }
})
export default class FlowMap extends Vue {
  created() {
    this.setSizes();
  }
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.setSizes();
      });
      this.runWebGL();
    })
  }
  destroyed() {
    window.removeEventListener('resize', this.setSizes);
  }
  setSizes() {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
  }
  runWebGL() {
    let _this = this;

    const vertex = `
                attribute vec2 uv;
                attribute vec3 position;
                uniform mat4 modelViewMatrix;
                uniform mat4 projectionMatrix;
                varying vec2 vUv;
                void main() {
                    vUv = uv;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `;

    const fragment = `
                uniform sampler2D tMap;
                varying vec2 vUv;
                void main() {
                    vec3 tex = texture2D(tMap, vUv).rgb;
                    float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
                    float d = fwidth(signedDist);
                    float alpha = smoothstep(-d, d, signedDist);
                    if (alpha < 0.01) discard;
                    gl_FragColor.rgb = vec3(0.0);
                    gl_FragColor.a = alpha;
                }
            `;

    const vertex100 = `
            ` + vertex;

    const fragment100 =
      `#extension GL_OES_standard_derivatives : enable
                precision highp float;
            ` + fragment;

    const vertex300 =
      `#version 300 es
                #define attribute in
                #define varying out
            ` + vertex;

    const fragment300 =
      `#version 300 es
                precision highp float;
                #define varying in
                #define texture2D texture
                #define gl_FragColor FragColor
                out vec4 FragColor;
            ` + fragment;

    {
      const renderer = new Renderer({ dpr: 2 });
      const gl = renderer.gl;
      document.body.appendChild(gl.canvas);
      gl.clearColor(1, 1, 1, 1);

      const camera = new Camera(gl, { fov: 45 });
      camera.position.set(0, 0, 7);

      const controls = new Orbit(camera);

      function resize() {
        renderer.setSize(300, 200);
        camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
      }
      window.addEventListener('resize', resize, false);
      resize();

      const scene = new Transform();

      const texture = new Texture(gl, {
        generateMipmaps: false,
      });
      const img = new Image();
      img.onload = () => (texture.image = img);
      img.src = 'NeueMontreal-Bold.png';

      const program = new Program(gl, {
        // Get fallback shader for WebGL1 - needed for OES_standard_derivatives ext
        vertex: renderer.isWebgl2 ? vertex300 : vertex100,
        fragment: renderer.isWebgl2 ? fragment300 : fragment100,
        uniforms: {
          tMap: { value: texture },
        },
        transparent: true,
        cullFace: null,
        depthWrite: false,
      });

      loadText();
      async function loadText() {
        const font = await (await fetch('NeueMontreal-Bold-msdf.json')).json();

        const text = new Text({
          font,
          text: "O",
          width: 4,
          align: 'center',
          size: 6.2,
          lineHeight: 1.1,
        });

        // Pass the generated buffers into a geometry
        const geometry = new Geometry(gl, {
          position: { size: 3, data: text.buffers.position },
          uv: { size: 2, data: text.buffers.uv },
          id: { size: 1, data: text.buffers.id },
          index: { data: text.buffers.index },
        });

        const mesh = new Mesh(gl, { geometry, program });

        // Use the height value to position text vertically. Here it is centered.
        mesh.position.y = text.height * 0.5;
        mesh.setParent(scene);
      }

      requestAnimationFrame(update);
      function update(t) {
        requestAnimationFrame(update);
        controls.update();
        renderer.render({ scene, camera });
      }
    }
  }
}
</script>

<style lang="sass">
  canvas
    position: fixed
    top: 0
    left: 0
    pointer-events: none
</style>
