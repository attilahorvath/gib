export default class {
  constructor(renderer, map, input, particleSystem) {
    this.renderer = renderer;
    this.map = map;
    this.input = input;
    this.particleSystem = particleSystem;

    this.dx = 0.0;
    this.dy = 0.0;

    this.ax = 0.0;
    this.ay = 0.0;

    this.direction = 0.0;
    this.lastDirection = 0.0;
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
    if (this.isBlocked(this.x, this.y + 1)) {
      this.ay = 0.0;
      this.dy = 0.0;
    } else if (this.isBlocked(this.x, this.y - 1)) {
      this.ay = 0.002;
      this.dy = 0.0;
    } else {
      this.ay = 0.002;
    }

    // this.particleSystem.emitParticle(this.x, this.y, 1.0, 0.0, 0.0, Math.random() - 0.5, Math.random() - 0.5);

    if (this.input.pressed(LEFT)) {
      this.particleSystem.emitParticle(this.x, this.y, 1.0, 1.0, 1.0, 0.0, 0.0);

      if (this.ax > 0.0) {
        this.ax = 0.0;
      }

      if (!this.isBlocked(this.x - 1, this.y)) {
        this.ax -= 0.0001;
      }

      this.direction = -1.0;
      this.lastDirection = 0.0;
    } else if (this.input.pressed(RIGHT)) {
      this.particleSystem.emitParticle(this.x, this.y, 1.0, 1.0, 1.0, 0.0, 0.0);

      if (this.ax < 0.0) {
        this.ax = 0.0;
      }

      if (!this.isBlocked(this.x + 1, this.y)) {
        this.ax += 0.0001;
      }

      this.direction = 1.0;
      this.lastDirection = 0.0;
    } else {
      if (this.direction !== 0.0) {
        this.ax = -this.ax;

        this.lastDirection = this.direction;
        this.direction = 0.0;
      }

      if ((this.lastDirection > 0.0 && this.dx < 0.001) ||
          (this.lastDirection < 0.0 && this.dx > 0.001) ||
          this.isBlocked(this.x - 1, this.y) ||
          this.isBlocked(this.x + 1, this.y)) {
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

    let newX = this.x + this.dx * deltaTime;

    if (this.isBlocked(newX, this.y)) {
      if (this.dx < 0) {
        newX += this.map.prevTileOffset(newX);
      } else {
        newX -= this.map.nextTileOffset(newX);
      }
    }

    this.x = newX;

    let newY = this.y + this.dy * deltaTime;

    if (this.isBlocked(this.x, newY)) {
      if (this.dy < 0) {
        newY += this.map.prevTileOffset(newY);
      } else {
        newY -= this.map.nextTileOffset(newY);
      }
    }

    this.y = newY;

    this.renderer.cameraX = this.x + SPRITE_SIZE / 2.0 -
                            SCREEN_WIDTH / 2.0;

    this.renderer.cameraY = this.y + SPRITE_SIZE / 2.0 -
                            SCREEN_HEIGHT / 2.0;
  }

  isBlocked(x, y) {
    return this.map.isBlocked(x, y) ||
           this.map.isBlocked(x, y + SPRITE_SIZE - 1) ||
           this.map.isBlocked(x + SPRITE_SIZE - 1, y) ||
           this.map.isBlocked(x + SPRITE_SIZE - 1,
                              y + SPRITE_SIZE - 1);
  }
}
