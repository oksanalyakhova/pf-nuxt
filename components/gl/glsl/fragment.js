export const fragmentShader = `
    precision mediump float;

    varying vec2 vUv;
    varying float vWave;
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uProg;

    void main() {
      vec2 uv = vUv;
      vec2 dUv = vec2(uv.x, uv.y);

      float w = vWave;
      float r = texture2D(uTexture, dUv + vec2(0., 0.) + uProg * w * 0.05).r;
      float g = texture2D(uTexture, dUv + vec2(0., 0.) + uProg * w * 0.0).g;
      float b = texture2D(uTexture, dUv + vec2(0., 0.) + uProg * w * -0.02).b;
      vec3 texture = vec3(r, g, b);
      gl_FragColor = vec4(texture, 1.);
    }

  `
