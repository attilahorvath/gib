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

  update(deltaTime) {
    this.dx += this.ax * deltaTime;
    this.dy += this.ay * deltaTime;

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

    let newX = this.x + this.dx * deltaTime;

    if (this.tileAt(newX, this.y)) {
      if (this.dx < 0) {
        newX += this.map.prevTileOffset(newX + this.hitboxX);
      } else {
        newX -= this.map.nextTileOffset(newX + this.hitboxX + this.hitboxW - 1)
                + 1;
      }
    }

    this.x = newX;

    let newY = this.y + this.dy * deltaTime;

    if (this.tileAt(this.x, newY)) {
      if (this.dy < 0) {
        newY += this.map.prevTileOffset(newY + this.hitboxY);
      } else {
        newY -= this.map.nextTileOffset(newY + this.hitboxY + this.hitboxH - 1)
                + 1;
      }
    }

    this.y = newY;
  }

  tileAt(x, y) {
    return this.map.tileAt(x + this.hitboxX,
                           y + this.hitboxY) ||
           this.map.tileAt(x + this.hitboxX,
                           y + this.hitboxY + this.hitboxH - 1) ||
           this.map.tileAt(x + this.hitboxX + this.hitboxW - 1,
                           y + this.hitboxY) ||
           this.map.tileAt(x + this.hitboxX + this.hitboxW - 1,
                           y + this.hitboxY + this.hitboxH - 1);
  }
}
