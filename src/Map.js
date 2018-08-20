import map from '../assets/map.txt';
import Sprite from './Sprite';
import Gib from './Gib';

export default class {
  constructor(renderer, entities) {
    this.renderer = renderer;

    this.tiles = [];

    const rows = map.split('\n');

    const vertexData = [];
    const indexData = [];

    let i = 0;

    for (let y = 0; y < rows.length; y++) {
      this.tiles.push([]);

      for (let x = 0; x < rows[y].length; x++) {
        const type = rows[y][x];

        if (type === ' ') {
          this.tiles[y].push(false);
          continue;
        }

        let u = null;
        let v = 0;

        switch (type) {
        case '1':
          u = 0;
          break;
        case '2':
          u = 1;
          break;
        case 'D':
          entities.push(new Sprite(renderer, this, renderer.SPRITE_SIZE * x,
            renderer.SPRITE_SIZE * y, 0.9, 0, 1));
          break;
        case 'G':
          entities.push(new Gib(renderer, this, renderer.SPRITE_SIZE * x,
                                renderer.SPRITE_SIZE * y));
          break;
        }

        if (u === null) {
          this.tiles[y].push(false);
          continue;
        }

        this.tiles[y].push(true);

        vertexData.push(
          renderer.SPRITE_SIZE * x, renderer.SPRITE_SIZE * y,
          renderer.tileTextureU(u), renderer.tileTextureV(v),

          renderer.SPRITE_SIZE * x, renderer.SPRITE_SIZE * (y + 1),
          renderer.tileTextureU(u), renderer.tileTextureV(v + 1),

          renderer.SPRITE_SIZE * (x + 1), renderer.SPRITE_SIZE * y,
          renderer.tileTextureU(u + 1), renderer.tileTextureV(v),

          renderer.SPRITE_SIZE * (x + 1), renderer.SPRITE_SIZE * (y + 1),
          renderer.tileTextureU(u + 1), renderer.tileTextureV(v + 1),
        );

        indexData.push(
          i, i + 1, i + 2,
          i + 1, i + 2, i + 3
        );

        i += 4;
      }
    }

    this.vertices = new Float32Array(vertexData);
    this.indices = new Uint16Array(indexData);

    this.vertexBuffer = renderer.gl.createBuffer();
    renderer.gl.bindBuffer(renderer.gl.ARRAY_BUFFER, this.vertexBuffer);
    renderer.gl.bufferData(renderer.gl.ARRAY_BUFFER, this.vertices,
                           renderer.gl.STATIC_DRAW);

    this.indexBuffer = renderer.gl.createBuffer();
    renderer.gl.bindBuffer(renderer.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    renderer.gl.bufferData(renderer.gl.ELEMENT_ARRAY_BUFFER, this.indices,
                           renderer.gl.STATIC_DRAW);

    this.model = new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]);
  }

  isBlocked(x, y) {
    const row = this.tiles[Math.floor(y / this.renderer.SPRITE_SIZE)];

    if (!row) {
      return false;
    }

    return row[Math.floor(x / this.renderer.SPRITE_SIZE)] === true;
  }

  draw() {
    this.renderer.draw(this.renderer.textureShader, this.model,
                       this.vertexBuffer, this.indexBuffer,
                       this.indices.length);
  }
}
