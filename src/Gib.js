export default class {
  constructor(renderer, map, input) {
    this.renderer = renderer;
    this.map = map;
    this.input = input;

    this.dx = 0.0;
    this.dy = 0.0;

    this.ax = 0.0;
    this.ay = 0.0;

    this.direction = 0.0;
    this.lastDirection = 0.0;
  }

  update(deltaTime) {
    if (this.onPlatform()) {
      this.ay = 0.0;
      this.dy = 0.0;
    } else if (this.platformHit()) {
      this.ay = 0.002;
      this.dy = 0.0;
    } else {
      this.ay = 0.002;
    }

    if (this.input.pressed(LEFT)) {
      if (this.ax > 0.0) {
        this.ax = 0.0;
      }

      this.ax -= 0.0001;

      this.direction = -1.0;
      this.lastDirection = 0.0;
    } else if (this.input.pressed(RIGHT)) {
      if (this.ax < 0.0) {
        this.ax = 0.0;
      }

      this.ax += 0.0001;

      this.direction = 1.0;
      this.lastDirection = 0.0;
    } else {
      if (this.direction !== 0.0) {
        this.lastDirection = this.direction;
        this.direction = 0.0;
        this.ax = -this.ax;
      }

      if (this.lastDirection > 0.0 && this.dx < 0.001) {
        this.dx = 0.0;
        this.ax = 0.0;
      } else if (this.lastDirection < 0.0 && this.dx > 0.001) {
        this.dx = 0.0;
        this.ax = 0.0;
      }
    }

    if (this.ax > 0.002) {
      this.ax = 0.002;
    } else if (this.ax < -0.002) {
      this.ax = -0.002;
    }

    if (this.input.justPressed(ACTION_A) && this.ay === 0.0) {
      this.dy = -0.8;
    }

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

    this.sprite.frameTimer.enabled = this.dx !== 0.0;
    this.sprite.frameDirection = Math.sign(this.dx);

    const newX = this.sprite.x + this.dx * deltaTime;

    if (!this.ignoreCollisions && this.isBlocked(newX, this.sprite.y)) {
      if (this.dx < 0) {
        this.sprite.x = newX + this.map.prevTileOffset(newX);
      } else {
        this.sprite.x = newX - this.map.nextTileOffset(newX);
      }
    } else {
      this.sprite.x = newX;
    }

    const newY = this.sprite.y + this.dy * deltaTime;

    if (!this.ignoreCollisions && this.isBlocked(this.sprite.x, newY)) {
      if (this.dy < 0) {
        this.sprite.y = newY + this.map.prevTileOffset(newY);
      } else {
        this.sprite.y = newY - this.map.nextTileOffset(newY);
      }
    } else {
      this.sprite.y = newY;
    }

    this.renderer.cameraX = this.sprite.x + SPRITE_SIZE / 2.0 -
                            SCREEN_WIDTH / 2.0;

    this.renderer.cameraY = this.sprite.y + SPRITE_SIZE / 2.0 -
                            SCREEN_HEIGHT / 2.0;
  }

  onPlatform() {
    return this.map.isBlocked(this.sprite.x,
                              this.sprite.y + SPRITE_SIZE) ||
           this.map.isBlocked(this.sprite.x + SPRITE_SIZE - 1,
                              this.sprite.y + SPRITE_SIZE);
  }

  platformHit() {
    return this.map.isBlocked(this.sprite.x,
                              this.sprite.y - 1) ||
           this.map.isBlocked(this.sprite.x + SPRITE_SIZE - 1,
                              this.sprite.y - 1);
  }

  isBlocked(x, y) {
    return this.map.isBlocked(x, y) ||
           this.map.isBlocked(x, y + SPRITE_SIZE - 1) ||
           this.map.isBlocked(x + SPRITE_SIZE - 1, y) ||
           this.map.isBlocked(x + SPRITE_SIZE - 1,
                              y + SPRITE_SIZE - 1);
  }
}
