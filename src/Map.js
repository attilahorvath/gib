import map from '../assets/map.txt';

const TILE_SIZE = 64.0;
const TEXTURE_TILE_SIZE = 16.0;
const TEXTURE_WIDTH = 64.0;

export default class {
  constructor(renderer) {
    this.renderer = renderer;

    const rows = map.split('\n');

    const vertexData = [];
    const indexData = [];

    let i = 0;

    for (let y = 0; y < rows.length; y++) {
      for (let x = 0; x < rows[y].length; x++) {
        const type = rows[y][x];

        if (type == ' ') {
          continue;
        }

        let u = 0;

        switch (type) {
        case '1':
          u = 0;
          break;
        case '2':
          u = 1;
          break;
        }

        vertexData.push(
          TILE_SIZE * x, TILE_SIZE * y,
          (TEXTURE_TILE_SIZE * u) / TEXTURE_WIDTH, 0,

          TILE_SIZE * x, TILE_SIZE * y + TILE_SIZE,
          (TEXTURE_TILE_SIZE * u) / TEXTURE_WIDTH, 1,

          TILE_SIZE * x + TILE_SIZE, TILE_SIZE * y,
          (TEXTURE_TILE_SIZE * u + TEXTURE_TILE_SIZE) / TEXTURE_WIDTH, 0,

          TILE_SIZE * x + TILE_SIZE, TILE_SIZE * y + TILE_SIZE,
          (TEXTURE_TILE_SIZE * u + TEXTURE_TILE_SIZE) / TEXTURE_WIDTH, 1
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

  draw() {
    this.renderer.draw(this.model, this.vertexBuffer, this.indexBuffer,
                       this.indices.length);
  }
}
