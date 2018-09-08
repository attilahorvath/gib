const MAX_PARTICLES = 2048;
const VERTEX_SIZE = 36;

export default class {
  constructor(renderer) {
    this.renderer = renderer;

    this.vertexBuffer = renderer.createVertexBuffer(MAX_PARTICLES *
                                                    VERTEX_SIZE);

    this.particleVertex = new Float32Array(VERTEX_SIZE / FLOAT_SIZE);
    this.nextIndex = 0;

    this.time = 0;
  }

  emitParticle(x, y, r, g, b, dx, dy, lifetime) {
    this.particleVertex[0] = x;
    this.particleVertex[1] = y;
    this.particleVertex[2] = r;
    this.particleVertex[3] = g;
    this.particleVertex[4] = b;
    this.particleVertex[5] = dx;
    this.particleVertex[6] = dy;
    this.particleVertex[7] = this.time;
    this.particleVertex[8] = lifetime;

    this.renderer.updateVertex(this.vertexBuffer, this.nextIndex * VERTEX_SIZE,
                               this.particleVertex);

    this.nextIndex = (this.nextIndex + 1) % MAX_PARTICLES;
  }

  update() {
    this.time += TIME_STEP;
  }

  draw() {
    this.renderer.particleShader.time = this.time;

    this.renderer.draw(this.renderer.particleShader, this.vertexBuffer,
                       MAX_PARTICLES);
  }
}
