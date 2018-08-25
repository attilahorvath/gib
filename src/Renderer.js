import spriteVertexShader from '../shaders/sprite.vert';
import spriteFragmentShader from '../shaders/sprite.frag';

import Shader from './Shader';

export default class {
  constructor() {
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
    });
    image.crossOrigin = '';
    image.src = 'TILES_TEXTURE';
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

  tileTextureU(u) {
    return (TILE_SIZE * u) / TILES_TEXTURE_WIDTH;
  }

  tileTextureV(v) {
    return (TILE_SIZE * v) / TILES_TEXTURE_HEIGHT;
  }

  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  update() {
    this.view[12] = -this.cameraX;
    this.view[13] = -this.cameraY;
  }

  draw(shader, model, vertexBuffer, indexBuffer, count, points = false) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);

    if (indexBuffer) {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    }

    shader.projection = this.projection;
    shader.view = this.view;
    shader.model = model;

    shader.use();

    const mode = points ? this.gl.POINTS : this.gl.TRIANGLES;

    if (indexBuffer) {
      this.gl.drawElements(mode, count, this.gl.UNSIGNED_SHORT, 0);
    } else {
      this.gl.drawArrays(mode, 0, count);
    }
  }
}
