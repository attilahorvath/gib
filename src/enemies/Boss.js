import SpriteController from "../SpriteController";
import Teleportation from '../items/Teleportation';

export default class extends SpriteController {
  constructor(game, renderer, map, spriteSheet, gib, particleSystem, textLayer,
              audio) {
    super(map);

    this.game = game;
    this.renderer = renderer;
    this.spriteSheet = spriteSheet;
    this.gib = gib;
    this.particleSystem = particleSystem;
    this.textLayer = textLayer;
    this.audio = audio;

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
                          this.particleSystem, this.textLayer, this.audio)
      );

      this.audio.play('square', 600, 100, 1.0);

      this.textLayer.helpText = null;
    } else {
      let text = 'BOSS ';

      for (let i = 0; i < Math.max(18, health); i++) {
        text += health > i ? '<' : '/';
      }

      this.textLayer.helpText = this.textLayer.createCenteredSegment(
        550, text, 32
      );
    }
  }
}
