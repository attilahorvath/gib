import Sprite from './Sprite';

const GIB_Z = 0.7;

export default class extends Sprite {
  constructor(renderer, map, x, y) {
    super(renderer, map, x, y, GIB_Z, 2, 0);

    this.top = new Sprite(renderer, map, x, y - renderer.SPRITE_SIZE, GIB_Z,
                          2, 0);
    this.bottom = new Sprite(renderer, map, x, y, GIB_Z, 3, 0,
                             [[3, 0], [4, 0], [5, 0], [6, 0]]);

    this.top.ignoreCollisions = true;
    this.bottom.ignoreCollisions = true;

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

    super.update(deltaTime);

    this.top.x = this.x;
    this.top.y = this.y - this.renderer.SPRITE_SIZE;

    this.bottom.x = this.x;
    this.bottom.y = this.y;

    this.bottom.frameDirection = Math.sign(this.dx);
    this.bottom.frameTimer.enabled = this.dx !== 0.0;

    this.top.update(deltaTime);
    this.bottom.update(deltaTime);

    this.renderer.cameraX = this.bottom.x + this.renderer.SPRITE_SIZE / 2.0 -
                            this.renderer.width / 2.0;

    this.renderer.cameraY = this.bottom.y + this.renderer.SPRITE_SIZE / 2.0 -
                            this.renderer.height / 2.0;
  }

  isBlocked(x, y) {
    return this.top.isBlocked(x, y - this.renderer.SPRITE_SIZE) ||
           this.bottom.isBlocked(x, y);
  }

  draw() {
    this.bottom.draw();
    this.top.draw();
  }
}
