import BossSegment from "./BossSegment";
import Timer from "../Timer";
import Poison from "../Poison";

export default class extends BossSegment {
  constructor(map, boss, gib, spriteSheet, particleSystem) {
    super(map, particleSystem);

    this.boss = boss;
    this.gib = gib;
    this.spriteSheet = spriteSheet;

    this.hitboxX = 8.0;
    this.hitboxY = 8.0;
    this.hitboxW = 48.0;
    this.hitboxH = 48.0;

    this.angle = 0.0;

    this.health = 3;

    this.ignoreCollisions = true;

    this.poisonTimer = new Timer(2500 + Math.random() * 5000, () => {
      this.shoot();
      this.poisonTimer.timeout = 2500 + Math.random() * 5000;
    }, true);
  }

  init(sprite) {
    super.init(sprite);

    this.baseX = this.x;
    this.baseY = this.y + 64.0;
  }

  update() {
    this.poisonTimer.update();

    this.angle = Math.atan2(
      (this.gib.top + this.gib.hitboxH / 2) - (this.baseY + this.hitboxH / 2),
      (this.gib.left + this.gib.hitboxW / 2) - (this.baseX + this.hitboxW / 2)
    );

    this.x = this.baseX + Math.cos(this.angle) * 32;
    this.y = this.baseY + Math.sin(this.angle) * 32;

    super.update();

    if (!(this.gib.left > this.right || this.gib.right < this.left ||
      this.gib.top > this.bottom || this.gib.bottom < this.top)) {
      this.gib.damage();
    }
  }

  shoot() {
    const dx = Math.cos(this.angle) * 0.2;
    const dy = Math.sin(this.angle) * 0.2;

    this.spriteSheet.spawnSprite(
      this.left + this.hitboxW / 2 - 32, this.top + this.hitboxH / 2 - 32,
      PROJECTILE_Z, 1.0, 2.0,
      new Poison(this.map, dx, dy, this.gib, this.particleSystem)
    );
  }

  laserHit() {
    this.health--;
    this.boss.damage();

    this.sprite.flash();

    if (this.health <= 0) {
      this.explode();
    }

    return true;
  }
}
