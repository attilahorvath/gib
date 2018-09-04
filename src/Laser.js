import SpriteController from "./SpriteController";

export default class extends SpriteController {
  constructor(map, direction, spriteSheet, particleSystem) {
    super(map);

    this.spriteSheet = spriteSheet;
    this.particleSystem = particleSystem;

    this.hitboxX = 12.0;
    this.hitboxY = 16.0;
    this.hitboxW = 40.0;
    this.hitboxH = 12.0;

    this.dx = direction === RIGHT ? 0.75 : -0.75;

    this.maxDx = 1.0;

    this.ignoreCollisions = true;
  }

  update() {
    super.update();

    if (this.tileAt()) {
      this.sprite.disable();
      this.explode();
      return;
    }

    for (const sprite of this.spriteSheet.sprites) {
      if (sprite.controller) {
        if (!(sprite.controller.left > this.right ||
              sprite.controller.right < this.left ||
              sprite.controller.top > this.bottom ||
              sprite.controller.bottom < this.top)) {
          if (sprite.controller.laserHit()) {
            this.sprite.disable();
            this.explode();
            return;
          }
        }
      }
    }

    const x = this.dx > 0 ? this.left : this.right;

    const type = Math.random() > 0.5;

    const r = type ? 0.0 : 0.66;
    const g = type ? 0.0 : 1.0;
    const b = type ? 0.66 : 0.93;

    if (Math.random() > 0.6) {
      this.particleSystem.emitParticle(
        x, this.top + this.hitboxH / 2.0 + (Math.random() - 0.5) * this.hitboxH,
        r, g, b,
        0.0, 0.0,
        500.0
      );
    }
  }

  explode() {
    for (let i = 0; i < 20; i++) {
      const type = Math.random() > 0.5;

      const r = type ? 0.0 : 0.66;
      const g = type ? 0.0 : 1.0;
      const b = type ? 0.66 : 0.93;

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
