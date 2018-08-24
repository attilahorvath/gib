import Sprite from "./Sprite";

const MAX_SPRITES = 128;
const VERTEX_SIZE = 20;

export default class {
  constructor(renderer) {
    this.renderer = renderer;

    this.vertexBuffer = renderer.gl.createBuffer();
    renderer.gl.bindBuffer(renderer.gl.ARRAY_BUFFER, this.vertexBuffer);
    renderer.gl.bufferData(renderer.gl.ARRAY_BUFFER, MAX_SPRITES * VERTEX_SIZE,
                           renderer.gl.STATIC_DRAW);

    this.spriteVertex = new Float32Array(5);

    this.sprites = [];

    for (let i = 0; i < MAX_SPRITES; i++) {
      this.sprites.push(new Sprite(i));
    }
  }

  insertSprite(i, sprite) {
    this.spriteVertex[0] = sprite.x;
    this.spriteVertex[1] = sprite.y;
    this.spriteVertex[2] = sprite.z;
    this.spriteVertex[3] = sprite.u;
    this.spriteVertex[4] = sprite.v;

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
        this.insertSprite(i, sprite);

        return sprite;
      }
    }
  }

  update(deltaTime) {
    for (let i = 0; i < MAX_SPRITES; i++) {
      const sprite = this.sprites[i];

      if (sprite.active) {
        if (sprite.update(deltaTime)) {
          this.insertSprite(i, sprite);
        }
      }
    }
  }

  draw() {
    this.renderer.draw(this.renderer.spriteShader, null,
      this.vertexBuffer, null, MAX_SPRITES, true);
  }
}
