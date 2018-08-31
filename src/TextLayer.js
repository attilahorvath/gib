const MAX_CHARS = 512;
const VERTEX_SIZE = 20;

export default class {
  constructor(renderer) {
    this.renderer = renderer;

    this.vertexBuffer = renderer.createVertexBuffer(MAX_CHARS * VERTEX_SIZE);

    this.charVertex = new Float32Array(VERTEX_SIZE / FLOAT_SIZE);
    this.nextIndex = 0;

    this.printString(200, 100, 'SYSTEMS\nOFFLINE', 32);
  }

  insertChar(x, y, char, size) {
    const charCode = char.charCodeAt(0);

    let u = 0;
    let v = 0;

    if (charCode >= 'A'.charCodeAt(0) && charCode <= 'P'.charCodeAt(0)) {
      u = (char.charCodeAt(0) - 'A'.charCodeAt(0)) *
          FONT_SIZE / TILES_TEXTURE_WIDTH;
      v = FONT_TEXTURE_OFFSET / TILES_TEXTURE_HEIGHT;
    } else if (charCode >= 'Q'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0)) {
      u = (char.charCodeAt(0) - 'Q'.charCodeAt(0)) *
          FONT_SIZE / TILES_TEXTURE_WIDTH;
      v = (FONT_TEXTURE_OFFSET + FONT_SIZE) / TILES_TEXTURE_HEIGHT;
    } else {
      return;
    }

    this.charVertex[0] = x + size / 2.0;
    this.charVertex[1] = y + size / 2.0;
    this.charVertex[2] = u;
    this.charVertex[3] = v;
    this.charVertex[4] = size;

    this.renderer.updateVertex(this.vertexBuffer, this.nextIndex * VERTEX_SIZE,
      this.charVertex);

    this.nextIndex = (this.nextIndex + 1) % MAX_CHARS;
  }

  printString(x, y, string, size) {
    let cx = x;

    for (const char of string) {
      if (char === '\n') {
        y += size + 12.0;
        cx = x;
      } else {
        this.insertChar(cx, y, char, size);
        cx += size;
      }
    }
  }

  update() {}

  draw() {
    this.renderer.draw(this.renderer.textShader, this.vertexBuffer, MAX_CHARS);
  }
}
