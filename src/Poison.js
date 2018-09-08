import SpriteController from "./SpriteController";

export default class extends SpriteController {
  constructor(map, dx, dy, gib, particleSystem) {
    super(map);

    this.dx = dx;
    this.dy = dy;

    this.gib = gib;
    this.particleSystem = particleSystem;

    this.hitboxX = 24.0;
    this.hitboxY = 24.0;
    this.hitboxW = 16.0;
    this.hitboxH = 16.0;

    this.maxDx = 1.0;
    this.maxDy = 1.0;

    this.ignoreCollisions = true;
  }

  update() {
    super.update();

    if (this.tileAt()) {
      this.sprite.disable();
      this.explode();
      return;
    }

    const type = Math.random() > 0.5;

    const r = type ? 0.8 : 1.0;
    const g = type ? 0.26 : 0.46;
    const b = type ? 0.8 : 0.46;

    if (Math.random() > 0.6) {
      this.particleSystem.emitParticle(
        this.left + this.hitboxW / 2.0 + (Math.random() - 0.5) * this.hitboxW,
        this.top + this.hitboxH / 2.0 + (Math.random() - 0.5) * this.hitboxH,
        r, g, b,
        0.0, 0.0,
        500.0
      );
    }

    if (!(this.gib.left > this.right || this.gib.right < this.left ||
      this.gib.top > this.bottom || this.gib.bottom < this.top)) {
      this.gib.damage();
      this.sprite.disable();
      this.explode();
    }

    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
  }

  explode() {
    for (let i = 0; i < 20; i++) {
      const type = Math.random() > 0.5;

      const r = type ? 0.8 : 1.0;
      const g = type ? 0.26 : 0.46;
      const b = type ? 0.8 : 0.46;

      this.particleSystem.emitParticle(
        this.left + Math.random() * this.hitboxW,
        this.top + Math.random() * this.hitboxH,
        r, g, b,
        (Math.random() - 0.5) * 0.25, (Math.random() - 0.5) * 0.25,
        200.0
      );
    }
  }
}
