import SpriteController from "../SpriteController";

export default class extends SpriteController {
  constructor(renderer, map, gib, particleSystem, parent) {
    super(map);

    this.renderer = renderer;
    this.gib = gib;
    this.particleSystem = particleSystem;
    this.parent = parent;

    this.hitboxX = 8.0;
    this.hitboxY = 8.0;
    this.hitboxW = 48.0;
    this.hitboxH = 48.0;

    this.direction = RIGHT;
    this.tolerance = 0;
  }

  update() {
    switch (this.direction) {
    case UP:
      if (this.tolerance === 0 && !this.tileAt(9.0, 0.0)) {
        this.direction = RIGHT;
        this.tolerance = 10;
        this.y = Math.floor(this.y);
      } else {
        this.dx = 0.0;
        this.dy = -0.1;
      }
      break;
    case DOWN:
      if (this.tolerance === 0 && !this.tileAt(-9.0, 0.0)) {
        this.direction = LEFT;
        this.tolerance = 10;
        this.y = Math.floor(this.y);
      } else {
        this.dx = 0.0;
        this.dy = 0.1;
      }
      break;
    case LEFT:
      if (this.tolerance === 0 && !this.tileAt(0.0, -9.0)) {
        this.direction = UP;
        this.tolerance = 10;
        this.x = Math.floor(this.x);
      } else {
        this.dx = -0.1;
        this.dy = 0.0;
      }
      break;
    case RIGHT:
      if (this.tolerance === 0 && !this.tileAt(0.0, 9.0)) {
        this.direction = DOWN;
        this.tolerance = 10;
        this.x = Math.floor(this.x);
      } else {
        this.dx = 0.1;
        this.dy = 0.0;
      }
      break;
    }

    this.tolerance--;

    if (this.tolerance < 0) {
      this.tolerance = 0;
    }

    super.update();

    if (!(this.gib.left > this.right || this.gib.right < this.left ||
      this.gib.top > this.bottom || this.gib.bottom < this.top)) {
      this.gib.damage();
    }
  }

  laserHit() {
    return this.parent.laserHit();
  }

  explode() {
    this.sprite.disable();

    for (let i = 0; i < 50; i++) {
      this.particleSystem.emitParticle(
        this.left + Math.random() * this.hitboxW,
        this.top + Math.random() * this.hitboxH,
        0.0, 0.8, 0.33,
        (Math.random() - 0.5) * 0.25, (Math.random() - 0.5) * 0.25,
        200.0
      );
    }
  }
}
