import TextSegment from "./TextSegment";

const MAX_CHARS = 512;
const VERTEX_SIZE = 20;

export default class {
  constructor(renderer) {
    this.renderer = renderer;

    this.vertexBuffer = renderer.createVertexBuffer(MAX_CHARS * VERTEX_SIZE);

    this.charVertex = new Float32Array(VERTEX_SIZE / FLOAT_SIZE);
    this.nextIndex = 0;

    this.title = null;
    this.help = null;

    this.lives = null;
  }

  set titleText(text) {
    if (this.title) {
      this.title.hide();
    }

    this.title = text;
  }

  set helpText(text) {
    if (this.help) {
      this.help.hide();
    }

    this.help = text;
  }

  set livesText(text) {
    if (this.lives) {
      this.lives.hide();
    }

    this.lives = text;
  }

  updateChar(char) {
    this.charVertex[0] = char.x + char.size / 2.0;
    this.charVertex[1] = char.y + char.size / 2.0;
    this.charVertex[2] = char.u;
    this.charVertex[3] = char.v;
    this.charVertex[4] = char.size;

    this.renderer.updateVertex(this.vertexBuffer, char.index * VERTEX_SIZE,
                               this.charVertex);
  }

  getUV(char) {
    const charCode = char.charCodeAt(0);

    let u = null;
    let v = null;

    if (charCode >= 'A'.charCodeAt(0) && charCode <= 'P'.charCodeAt(0)) {
      u = (char.charCodeAt(0) - 'A'.charCodeAt(0)) *
          FONT_SIZE / TILES_TEXTURE_WIDTH;
      v = FONT_TEXTURE_OFFSET / TILES_TEXTURE_HEIGHT;
    } else if (charCode >= 'Q'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0)) {
      u = (char.charCodeAt(0) - 'Q'.charCodeAt(0)) *
          FONT_SIZE / TILES_TEXTURE_WIDTH;
      v = (FONT_TEXTURE_OFFSET + FONT_SIZE) / TILES_TEXTURE_HEIGHT;
    } else if (char === '<') {
      u = 10 * FONT_SIZE / TILES_TEXTURE_WIDTH;
      v = (FONT_TEXTURE_OFFSET + FONT_SIZE) / TILES_TEXTURE_HEIGHT;
    } else if (char === '/') {
      u = 11 * FONT_SIZE / TILES_TEXTURE_WIDTH;
      v = (FONT_TEXTURE_OFFSET + FONT_SIZE) / TILES_TEXTURE_HEIGHT;
    }

    return [u, v];
  }

  createSegment(x, y, string, size, style, timeOffset, timeout) {
    let chars = [];

    let cx = x;

    for (const char of string) {
      if (char === '\n') {
        y += size + 12.0;
        cx = x;
      } else {
        const [u, v] = this.getUV(char);

        if (u !== null && v !== null) {
          const index = this.nextIndex;
          this.nextIndex = (this.nextIndex + 1) % MAX_CHARS;

          chars.push({ index: index, x: cx, y: y, u: u, v: v, size: size });
        }

        cx += size;
      }
    }

    return new TextSegment(this, chars, size, style, timeOffset, timeout);
  }

  update() {
    if (this.title) {
      this.title.update();
    }

    if (this.help) {
      this.help.update();
    }

    if (this.lives) {
      this.lives.update();
    }
  }

  draw() {
    this.renderer.draw(this.renderer.textShader, this.vertexBuffer, MAX_CHARS);
  }
}
