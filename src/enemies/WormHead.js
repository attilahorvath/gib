import WormSegment from "./WormSegment";

export default class extends WormSegment {
  constructor(renderer, map, spriteSheet, gib, particleSystem) {
    super(renderer, map, gib, particleSystem);

    this.spriteSheet = spriteSheet;

    this.health = 5;
  }

  init(sprite) {
    super.init(sprite);

    this.middle = new WormSegment(this.renderer, this.map, this.gib,
                                  this.particleSystem, this);

    this.tail = new WormSegment(this.renderer, this.map, this.gib,
                                this.particleSystem, this);

    this.spriteSheet.spawnSprite(
      this.sprite.x - 47, this.sprite.y, MAP_Z, 7.0, 1.0, this.middle
    );

    this.spriteSheet.spawnSprite(
      this.sprite.x - 94, this.sprite.y, MAP_Z, 7.0, 1.0, this.tail
    );
  }

  laserHit() {
    this.health--;

    if (this.health <= 0) {
      this.explode();
      this.middle.explode();
      this.tail.explode();
    }

    return true;
  }
}
