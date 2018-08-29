import Sprite from "./Sprite";

const MAX_SPRITES = 8192;
const VERTEX_SIZE = 20;

export default class {
  constructor(renderer) {
    this.renderer = renderer;

    this.vertexBuffer = renderer.gl.createBuffer();
    renderer.gl.bindBuffer(renderer.gl.ARRAY_BUFFER, this.vertexBuffer);
    renderer.gl.bufferData(renderer.gl.ARRAY_BUFFER, MAX_SPRITES * VERTEX_SIZE,
                           renderer.gl.STATIC_DRAW);

    this.spriteVertex = new Float32Array(VERTEX_SIZE / FLOAT_SIZE);

    this.sprites = [];

    for (let i = 0; i < MAX_SPRITES; i++) {
      this.sprites.push(new Sprite(i));
    }
  }

  updateSprite(i, sprite) {
    this.spriteVertex[0] = sprite.active ? sprite.x + SPRITE_SIZE / 2.0 : 0.0;
    this.spriteVertex[1] = sprite.active ? sprite.y + SPRITE_SIZE / 2.0 : 0.0;
    this.spriteVertex[2] = sprite.active ? sprite.z : 0.0;
    this.spriteVertex[3] = sprite.active ? sprite.u : 0.0;
    this.spriteVertex[4] = sprite.active ? sprite.v : 0.0;

    this.renderer.gl.bindBuffer(this.renderer.gl.ARRAY_BUFFER,
                                this.vertexBuffer);

    this.renderer.gl.bufferSubData(
      this.renderer.gl.ARRAY_BUFFER,
      i * VERTEX_SIZE,
      this.spriteVertex
    );
  }

  spawnSprite(x, y, z, u, v, controller = null, frames = null) {
    for (let i = 0; i < MAX_SPRITES; i++) {
      const sprite = this.sprites[i];

      if (!sprite.active) {
        sprite.spawn(x, y, z, u, v, controller, frames);
        this.updateSprite(i, sprite);

        return sprite;
      }
    }
  }

  update() {
    for (let i = 0; i < MAX_SPRITES; i++) {
      const sprite = this.sprites[i];

      if (sprite.active) {
        if (sprite.update()) {
          this.updateSprite(i, sprite);
        }
      }
    }
  }

  draw() {
    this.renderer.draw(this.renderer.spriteShader, null,
      this.vertexBuffer, null, MAX_SPRITES, true);
  }
}
