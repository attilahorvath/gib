import SpriteController from "./SpriteController";

export default class extends SpriteController {
  constructor(map, direction, particleSystem) {
    super(map);

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
    }

    const x = this.dx > 0 ? this.left : this.right;

    if (Math.random() > 0.8) {
      this.particleSystem.emitParticle(
        x, this.top + this.hitboxH / 2.0 + (Math.random() - 0.5) * this.hitboxH,
        0.0, 0.0, 0.66,
        0.0, 0.0,
        500.0
      );
    }
  }
}
