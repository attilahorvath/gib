import spriteVertexShader from '../shaders/sprite.vert';
import spriteFragmentShader from '../shaders/sprite.frag';

import particleVertexShader from '../shaders/particle.vert';
import particleFragmentShader from '../shaders/particle.frag';

import textVertexShader from '../shaders/text.vert';
import textFragmentShader from '../shaders/text.frag';

import Shader from './Shader';
import Timer from './Timer';

export default class {
  constructor(game) {
    const canvas = document.createElement('canvas');
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    document.body.appendChild(canvas);

    this.gl = canvas.getContext('webgl', { antialias: false });

    this.gl.enable(this.gl.DEPTH_TEST);

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    this.gl.clearColor(0, 0.53, 1, 1);

    this.spriteShader = new Shader(this.gl, spriteVertexShader,
                                   spriteFragmentShader);

    this.particleShader = new Shader(this.gl, particleVertexShader,
                                     particleFragmentShader);

    this.textShader = new Shader(this.gl, textVertexShader,
                                 textFragmentShader);

    this.projection = new Float32Array([
      2.0 / SCREEN_WIDTH, 0.0, 0.0, 0.0,
      0.0, -2.0 / SCREEN_HEIGHT, 0.0, 0.0,
      0.0, 0.0, -1.0, 0.0,
      -1.0, 1.0, 0.0, 1.0
    ]);

    this.view = new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]);

    this.cameraX = 0.0;
    this.cameraY = 0.0;

    this.texture = this.gl.createTexture();

    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0,
                       this.gl.RGBA, this.gl.UNSIGNED_BYTE,
                       new Uint8Array([0, 0, 255, 255]));

    this.setUpTexture();

    const image = new Image();

    image.addEventListener('load', () => {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA,
                         this.gl.UNSIGNED_BYTE, image);

      this.setUpTexture();

      game.loaded = true;
    });

    image.crossOrigin = '';
    image.src = 'TILES_TEXTURE';

    this.shakeTimer = new Timer(200);
    this.shakeTimer.enabled = false;
    this.shakeIntensity = 10;
  }

  setUpTexture() {
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S,
                          this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T,
                          this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER,
                          this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER,
                          this.gl.NEAREST);
  }

  createVertexBuffer(size) {
    const vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, size, this.gl.STATIC_DRAW);

    return vertexBuffer;
  }

  updateVertex(vertexBuffer, index, vertex) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);

    this.gl.bufferSubData(this.gl.ARRAY_BUFFER, index, vertex);
  }

  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  shake(intensity = 10) {
    this.shakeIntensity = intensity;
    this.shakeTimer.reset();
  }

  update() {
    this.shakeTimer.update();

    this.view[12] = -this.cameraX;
    this.view[13] = -this.cameraY;

    if (this.shakeTimer.enabled) {
      this.view[12] += (Math.random() - 0.5) * this.shakeIntensity;
      this.view[13] += (Math.random() - 0.5) * this.shakeIntensity;
    }

    this.view[12] = Math.round(this.view[12]);
    this.view[13] = Math.round(this.view[13]);
  }

  draw(shader, vertexBuffer, count) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);

    shader.projection = this.projection;
    shader.view = this.view;

    shader.use();

    this.gl.drawArrays(this.gl.POINTS, 0, count);
  }
}
