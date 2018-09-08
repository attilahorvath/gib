import SpriteController from "../SpriteController";
import Teleportation from '../items/Teleportation';

export default class extends SpriteController {
  constructor(game, renderer, map, spriteSheet, gib, particleSystem, textLayer,
              speech) {
    super(map);

    this.game = game;
    this.renderer = renderer;
    this.spriteSheet = spriteSheet;
    this.gib = gib;
    this.particleSystem = particleSystem;
    this.textLayer = textLayer;
    this.speech = speech;

    this.eyes = [];
    this.segments = [];
  }

  damage() {
    const health = this.eyes.reduce((memo, eye) => memo + eye.health, 0);

    if (health <= 0) {
      for (const segment of this.segments) {
        segment.explode();
      }

      this.spriteSheet.spawnSprite(
        this.teleportationX, this.teleportationY, DECAL_Z, 3.0, 2.0,
        new Teleportation(this.game, this.renderer, this.map, this.gib,
                          this.particleSystem, this.textLayer, this.speech)
      );

      this.textLayer.helpText = null;
    } else {
      let text = 'BOSS ';

      for (let i = 0; i < Math.max(18, health); i++) {
        text += health > i ? '<' : '/';
      }

      this.textLayer.helpText = this.textLayer.createCenteredSegment(
        400, text, 32
      );
    }
  }
}
