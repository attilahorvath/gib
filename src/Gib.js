export default class {
  constructor(renderer, map) {
    this.renderer = renderer;
    this.map = map;

    this.dx = 0.0;
    this.dy = 0.0;

    this.leftPressed = false;
    this.rightPressed = false;
    this.upPressed = false;
    this.downPressed = false;

    addEventListener("keydown", event => {
      switch (event.keyCode) {
      case 37:
        this.leftPressed = true;
        event.preventDefault();
        break;
      case 39:
        this.rightPressed = true;
        event.preventDefault();
        break;
      case 38:
        this.upPressed = true;
        event.preventDefault();
        break;
      case 40:
        this.downPressed = true;
        event.preventDefault();
        break;
      }
    });

    addEventListener("keyup", event => {
      switch (event.keyCode) {
      case 37:
        this.leftPressed = false;
        event.preventDefault();
        break;
      case 39:
        this.rightPressed = false;
        event.preventDefault();
        break;
      case 38:
        this.upPressed = false;
        event.preventDefault();
        break;
      case 40:
        this.downPressed = false;
        event.preventDefault();
        break;
      }
    });
  }

  update(deltaTime) {
    this.dx = 0.0;
    this.dy = 0.0;

    if (this.leftPressed) {
      this.dx -= 0.1;
    }
    if (this.rightPressed) {
      this.dx += 0.1;
    }
    if (this.upPressed) {
      this.dy -= 0.1;
    }
    if (this.downPressed) {
      this.dy += 0.1;
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

  isBlocked(x, y) {
    return this.map.isBlocked(x, y) ||
           this.map.isBlocked(x, y + SPRITE_SIZE - 1) ||
           this.map.isBlocked(x + SPRITE_SIZE - 1, y) ||
           this.map.isBlocked(x + SPRITE_SIZE - 1,
                              y + SPRITE_SIZE - 1);
  }
}
