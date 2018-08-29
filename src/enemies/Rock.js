import SpriteController from "../SpriteController";
import Timer from "../Timer";

export default class extends SpriteController {
  constructor(map, gib, particleSystem) {
    super(map);

    this.gib = gib;
    this.particleSystem = particleSystem;

    this.hitboxX = 8.0;
    this.hitboxY = 4.0;
    this.hitboxW = 56.0;
    this.hitboxH = 20.0;

    this.falling = false;

    this.xOffset = 0.0;
    this.yOffset = 0.0;

    this.timer = new Timer(200, () => {
      this.falling = true;
    });

    this.timer.enabled = false;

    this.fell = false;
  }

  init(sprite) {
    super.init(sprite);

    this.baseX = this.x;
    this.baseY = this.y;
  }

  update() {
    if (!this.fell) {
      this.timer.update();

      if (!(this.gib.left - 15.0 > this.right ||
            this.gib.right + 15.0 < this.left ||
            this.gib.bottom < this.top) && !this.falling) {
        this.timer.enabled = true;
      }

      if (this.timer.enabled) {
        const xOffset = Math.random() * 8.0 - 4.0;
        const yOffset = Math.random() * 8.0 - 4.0;

        this.x = this.baseX + xOffset;
        this.y = this.baseY + yOffset;
      }

      if (this.falling) {
        if (this.tileAt(0.0, 1.0)) {
          this.ay = 0.0;
          this.dy = 0.0;

          this.falling = false;
          this.fell = true;

          for (let i = 0; i < 50; i++) {
            this.particleSystem.emitParticle(
              this.left + this.hitboxW / 2.0, this.top + this.hitboxH / 2.0,
              0.86, 0.53, 0.33,
              (Math.random() - 0.5) * 0.5, -Math.random() * 0.25,
              700.0
            );
          }
        } else {
          this.ay = 0.002;

          if (!(this.gib.left > this.right || this.gib.right < this.left ||
            this.gib.top > this.bottom || this.gib.bottom < this.top)) {
            this.gib.respawn();
          }
        }
      }
    }

    super.update();
  }
}
