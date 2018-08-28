const MAX_PARTICLES = 128;
const VERTEX_SIZE = 32;

export default class {
  constructor(renderer) {
    this.renderer = renderer;

    this.vertexBuffer = renderer.gl.createBuffer();
    renderer.gl.bindBuffer(renderer.gl.ARRAY_BUFFER, this.vertexBuffer);
    renderer.gl.bufferData(renderer.gl.ARRAY_BUFFER,
                           MAX_PARTICLES * VERTEX_SIZE,
                           renderer.gl.STATIC_DRAW);

    this.particleVertex = new Float32Array(VERTEX_SIZE / FLOAT_SIZE);
    this.nextIndex = 0;

    this.time = 0;
  }

  emitParticle(x, y, r, g, b, dx, dy) {
    this.particleVertex[0] = x;
    this.particleVertex[1] = y;
    this.particleVertex[2] = r;
    this.particleVertex[3] = g;
    this.particleVertex[4] = b;
    this.particleVertex[5] = dx;
    this.particleVertex[6] = dy;
    this.particleVertex[7] = this.time;

    this.renderer.gl.bindBuffer(this.renderer.gl.ARRAY_BUFFER,
                                this.vertexBuffer);

    this.renderer.gl.bufferSubData(
      this.renderer.gl.ARRAY_BUFFER,
      this.nextIndex * VERTEX_SIZE,
      this.particleVertex
    );

    this.nextIndex = (this.nextIndex + 1) % MAX_PARTICLES;
  }

  update() {
    this.time += TIME_STEP;
  }

  draw() {
    this.renderer.particleShader.time = this.time;

    this.renderer.draw(this.renderer.particleShader, null,
      this.vertexBuffer, null, MAX_PARTICLES, true);
  }
}
