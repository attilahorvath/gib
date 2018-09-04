import SpriteController from "./SpriteController";

export default class extends SpriteController {
  constructor(renderer, map, particleSystem) {
    super(map);

    this.renderer = renderer;
    this.particleSystem = particleSystem;

    this.ignoreCollisions = true;

    this.integrity = 50;
  }

  drill() {
    this.integrity--;

    if (this.integrity <= 0) {
      for (let i = 0; i < 100; i++) {
        const type = Math.random() < 0.75;

        const r = type ? 1.0 : 0.93;
        const g = type ? 0.46 : 0.93;
        const b = 0.46;

        this.particleSystem.emitParticle(
          this.left + Math.random() * this.hitboxW,
          this.top + Math.random() * this.hitboxH,
          r, g, b,
          (Math.random() - 0.5) * 0.25, (Math.random() - 0.5) * 0.25,
          700.0
        );
      }

      this.renderer.shake(20);

      this.sprite.disable();
      this.map.setTileAt(this.x, this.y, null);
    }
  }
}
