import Sprite from './Sprite';

export default class extends Sprite {
  constructor(renderer, x, y) {
    super(renderer, 16, 16, x, y, 0.7, 0, 0);

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
      this.dx -= 0.05;
    }
    if (this.rightPressed) {
      this.dx += 0.05;
    }
    if (this.upPressed) {
      this.dy -= 0.05;
    }
    if (this.downPressed) {
      this.dy += 0.05;
    }

    super.update(deltaTime);
  }
}
