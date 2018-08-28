import SpriteController from "../SpriteController";

export default class extends SpriteController {
  constructor(map, gib) {
    super(map);

    this.gib = gib;

    this.hitboxX = 8.0;
    this.hitboxY = 4.0;
    this.hitboxW = 56.0;
    this.hitboxH = 20.0;

    this.falling = false;
  }

  update() {
    this.falling = !(this.gib.left - 25.0 > this.right ||
                     this.gib.right + 25.0 < this.left ||
                     this.gib.bottom < this.top);

    if (this.tileAt(0.0, 1.0)) {
      this.ay = 0.0;
      this.dy = 0.0;

      this.falling = false;
    } else if (this.falling) {
      this.ay = 0.002;
    }

    super.update();
  }
}
