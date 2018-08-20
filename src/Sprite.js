import Timer from "./Timer";

let vertices;
let indices;

let vertexBuffer;
let indexBuffer;

export default class {
  constructor(renderer, map, x, y, z, u, v, frames) {
    this.renderer = renderer;
    this.map = map;

    this.x = x;
    this.y = y;

    this.dx = 0;
    this.dy = 0;

    this.ignoreCollisions = false;

    if (frames) {
      this.frames = frames;
      this.currentFrame = 0;
      this.frameDirection = -1;

      this.frameTimer = new Timer(100, () => {
        this.currentFrame =
          (this.currentFrame + this.frameDirection) % this.frames.length;

        if (this.currentFrame < 0) {
          this.currentFrame = this.frames.length - 1;
        }

        this.updateFrame(this.frames[this.currentFrame]);
      }, true);
    }

    if (!vertices) {
      vertices = new Float32Array([
        0.0, 0.0, 0.0, 0.0,
        0.0, renderer.SPRITE_SIZE, 0.0, 1.0,
        renderer.SPRITE_SIZE, 0.0, 1.0, 0.0,
        renderer.SPRITE_SIZE, renderer.SPRITE_SIZE, 1.0, 1.0
      ]);
    }

    if (!indices) {
      indices = new Uint16Array([
        0, 1, 2,
        2, 1, 3
      ]);
    }

    if (!vertexBuffer) {
      vertexBuffer = renderer.gl.createBuffer();
      renderer.gl.bindBuffer(renderer.gl.ARRAY_BUFFER, vertexBuffer);
      renderer.gl.bufferData(renderer.gl.ARRAY_BUFFER, vertices,
                             renderer.gl.STATIC_DRAW);
    }

    if (!indexBuffer) {
      indexBuffer = renderer.gl.createBuffer();
      renderer.gl.bindBuffer(renderer.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      renderer.gl.bufferData(renderer.gl.ELEMENT_ARRAY_BUFFER, indices,
                             renderer.gl.STATIC_DRAW);
    }

    this.model = new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, z, 1.0
    ]);

    this.updateFrame([u, v]);
  }

  updateFrame(texCoords) {
    this.texBounds = new Float32Array([
      this.renderer.tileTextureU(texCoords[0]),
      this.renderer.tileTextureU(texCoords[0] + 1),
      this.renderer.tileTextureV(texCoords[1]),
      this.renderer.tileTextureV(texCoords[1] + 1)
    ]);
  }

  update(deltaTime) {
    const newX = this.x + this.dx * deltaTime;

    if (this.ignoreCollisions || !this.isBlocked(newX, this.y)) {
      this.x = newX;
    }

    const newY = this.y + this.dy * deltaTime;

    if (this.ignoreCollisions || !this.isBlocked(this.x, newY)) {
      this.y = newY;
    }

    this.model[12] = this.x;
    this.model[13] = this.y;

    if (this.frameTimer) {
      this.frameTimer.update(deltaTime);
    }
  }

  isBlocked(x, y) {
    return this.map.isBlocked(x, y) ||
           this.map.isBlocked(x, y + this.renderer.SPRITE_SIZE) ||
           this.map.isBlocked(x + this.renderer.SPRITE_SIZE, y) ||
           this.map.isBlocked(x + this.renderer.SPRITE_SIZE,
                              y + this.renderer.SPRITE_SIZE);
  }

  draw() {
    this.renderer.spriteShader.texBounds = this.texBounds;

    this.renderer.draw(this.renderer.spriteShader, this.model,
                       vertexBuffer, indexBuffer, indices.length);
  }
}
