export default class {
  constructor(renderer, width, height, x, y, dx, dy) {
    this.renderer = renderer;

    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;

    this.dx = dx;
    this.dy = dy;

    const vertices = new Float32Array([
      0.0, 0.0, 0.0, 0.0,
      0.0, height, 0.0, 1.0,
      width, 0.0, 1.0, 0.0,
      width, height, 1.0, 1.0
    ]);

    const indices = new Uint16Array([
      0, 1, 2,
      2, 1, 3
    ]);

    this.vertexBuffer = renderer.gl.createBuffer();
    renderer.gl.bindBuffer(renderer.gl.ARRAY_BUFFER, this.vertexBuffer);
    renderer.gl.bufferData(renderer.gl.ARRAY_BUFFER, vertices,
                           renderer.gl.STATIC_DRAW);

    this.indexBuffer = renderer.gl.createBuffer();
    renderer.gl.bindBuffer(renderer.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    renderer.gl.bufferData(renderer.gl.ELEMENT_ARRAY_BUFFER, indices,
                           renderer.gl.STATIC_DRAW);

    this.model = new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      x, y, 0.0, 1.0
    ]);
  }

  update(deltaTime) {
    this.x += this.dx * deltaTime;
    this.y += this.dy * deltaTime;

    this.model[12] = this.x;
    this.model[13] = this.y;
  }

  draw() {
    this.renderer.draw(this.model, this.vertexBuffer, this.indexBuffer, 6);
  }
}
