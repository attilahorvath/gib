export default class {
  constructor(map) {
    this.map = map;

    this.dx = 0.0;
    this.dy = 0.0;

    this.ax = 0.0;
    this.ay = 0.0;

    this.hitboxX = 0.0;
    this.hitboxY = 0.0;
    this.hitboxW = SPRITE_SIZE;
    this.hitboxH = SPRITE_SIZE;
  }

  get x() {
    return this.sprite.x;
  }

  get y() {
    return this.sprite.y;
  }

  set x(x) {
    this.sprite.x = x;
  }

  set y(y) {
    this.sprite.y = y;
  }

  get left() {
    return this.x + this.hitboxX;
  }

  get right() {
    return this.x + this.hitboxX + this.hitboxW - 1;
  }

  get top() {
    return this.y + this.hitboxY;
  }

  get bottom() {
    return this.y + this.hitboxY + this.hitboxH - 1;
  }

  update() {
    this.dx += this.ax * TIME_STEP;
    this.dy += this.ay * TIME_STEP;

    if (this.dx > 0.5) {
      this.dx = 0.5;
    } else if (this.dx < -0.5) {
      this.dx = -0.5;
    }

    if (this.dy > 2.0) {
      this.dy = 2.0;
    } else if (this.dy < -2.0) {
      this.dy = -2.0;
    }

    this.x += this.dx * TIME_STEP;

    if (this.tileAt()) {
      if (this.dx < 0) {
        this.x += this.map.prevTileOffset(this.left);
      } else {
        this.x -= this.map.nextTileOffset(this.right) + 1;
      }
    }

    this.y += this.dy * TIME_STEP;

    if (this.tileAt()) {
      if (this.dy < 0) {
        this.y += this.map.prevTileOffset(this.top);
      } else {
        this.y -= this.map.nextTileOffset(this.bottom) + 1;
      }
    }
  }

  tileAt(xOffset = 0, yOffset = 0) {
    return this.map.tileAt(this.left + xOffset, this.top + yOffset) ||
           this.map.tileAt(this.left + xOffset, this.bottom + yOffset) ||
           this.map.tileAt(this.right + xOffset, this.top + yOffset) ||
           this.map.tileAt(this.right + xOffset, this.bottom + yOffset);
  }
}
