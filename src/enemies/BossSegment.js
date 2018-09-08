import SpriteController from "../SpriteController";

export default class extends SpriteController {
  constructor(map, particleSystem) {
    super(map);

    this.particleSystem = particleSystem;
  }

  explode() {
    this.sprite.disable();

    for (let i = 0; i < 50; i++) {
      this.particleSystem.emitParticle(
        this.left + Math.random() * this.hitboxW,
        this.top + Math.random() * this.hitboxH,
        0.0, 0.8, 0.33,
        (Math.random() - 0.5) * 0.25, (Math.random() - 0.5) * 0.25,
        2500.0
      );
    }
  }
}
