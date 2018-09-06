import SpriteController from "../SpriteController";
import Timer from "../Timer";

export default class extends SpriteController {
  constructor(renderer, map, gib, particleSystem) {
    super(map);

    this.renderer = renderer;
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
      this.x = this.baseX;
      this.y = this.baseY;

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

      if (!(this.gib.left - 50.0 > this.right ||
            this.gib.right + 50.0 < this.left ||
            this.gib.bottom < this.top ||
            this.gib.top - 100.0 > this.bottom) && !this.falling) {
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

          this.renderer.shake();

          for (let i = 0; i < 50; i++) {
            this.particleSystem.emitParticle(
              this.left + Math.random() * this.hitboxW,
              this.top + Math.random() * this.hitboxH,
              0.86, 0.53, 0.33,
              (Math.random() - 0.5) * 0.25, -Math.random() * 0.125,
              700.0
            );
          }
        } else {
          this.ay = 0.007;

          if (!(this.gib.left > this.right || this.gib.right < this.left ||
            this.gib.top > this.bottom || this.gib.bottom < this.top)) {
            this.gib.damage();
          }
        }
      }
    }

    super.update();
  }
}
