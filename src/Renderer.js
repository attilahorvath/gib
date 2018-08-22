import textureVertexShader from '../shaders/texture.vert';
import textureFragmentShader from '../shaders/texture.frag';
import spriteVertexShader from '../shaders/sprite.vert';
import spriteFragmentShader from '../shaders/sprite.frag';

import Shader from './Shader';

const TILES_TEXTURE = 'textures/tiles.png';
const TILES_TEXTURE_WIDTH = 128.0;
const TILES_TEXTURE_HEIGHT = 32.0;
const TILE_SIZE = 16.0;
const SPRITE_SIZE = 64.0;

export default class {
  constructor(width, height) {
    this.TILES_TEXTURE_WIDTH = TILES_TEXTURE_WIDTH;
    this.TILES_TEXTURE_HEIGHT = TILES_TEXTURE_HEIGHT;
    this.TILE_SIZE = TILE_SIZE;
    this.SPRITE_SIZE = SPRITE_SIZE;

    this.width = width;
    this.height = height;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    this.gl = canvas.getContext('webgl', { antialias: false });

    this.gl.enable(this.gl.DEPTH_TEST);

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

    this.gl.clearColor(0, 0.53, 1, 1);

    this.textureShader = new Shader(this.gl, textureVertexShader,
                                    textureFragmentShader);

    this.spriteShader = new Shader(this.gl, spriteVertexShader,
                                   spriteFragmentShader);

    this.projection = new Float32Array([
      2.0 / width, 0.0, 0.0, 0.0,
      0.0, -2.0 / height, 0.0, 0.0,
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
    image.src = TILES_TEXTURE;
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
    return (this.TILE_SIZE * u) / this.TILES_TEXTURE_WIDTH;
  }

  tileTextureV(v) {
    return (this.TILE_SIZE * v) / this.TILES_TEXTURE_HEIGHT;
  }

  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  update() {
    this.view[12] = -this.cameraX;
    this.view[13] = -this.cameraY;
  }

  draw(shader, model, vertexBuffer, indexBuffer, count) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    shader.projection = this.projection;
    shader.view = this.view;
    shader.model = model;

    shader.use();

    this.gl.drawElements(this.gl.TRIANGLES, count, this.gl.UNSIGNED_SHORT, 0);
  }
}
