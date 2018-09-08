import SpriteController from "../SpriteController";

export default class extends SpriteController {
  constructor(map) {
    super(map);

    this.eyes = [];
    this.segments = [];
  }

  damage() {
    if (this.eyes.every(eye => eye.health <= 0)) {
      for (const segment of this.segments) {
        segment.explode();
      }
    }
  }
}
