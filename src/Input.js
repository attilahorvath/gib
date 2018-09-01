const KEY_UP = 'ArrowUp';
const KEY_DOWN = 'ArrowDown';
const KEY_LEFT = 'ArrowLeft';
const KEY_RIGHT = 'ArrowRight';

const KEY_W = 'KeyW';
const KEY_S = 'KeyS';
const KEY_A = 'KeyA';
const KEY_D = 'KeyD';

const KEY_X = 'KeyX';
const KEY_Z = 'KeyZ';

const KEY_K = 'KeyK';
const KEY_J = 'KeyJ';

const KEY_SPACE = 'Space';

const keyCodeMapping = {
  38: KEY_UP,
  40: KEY_DOWN,
  37: KEY_LEFT,
  39: KEY_RIGHT,

  87: KEY_W,
  65: KEY_A,
  83: KEY_S,
  68: KEY_D,

  88: KEY_X,
  90: KEY_Z,

  75: KEY_K,
  74: KEY_J,

  32: KEY_SPACE
};

export default class {
  constructor() {
    this.keysPressed = 0;
    this.lastPressed = 0;
    this.keysJustPressed = 0;
    this.keysJustReleased = 0;

    addEventListener("keydown", event => {
      const code = event.code || keyCodeMapping[event.keyCode];

      switch (code) {
      case KEY_UP: case KEY_W:
        this.keysPressed |= UP;
        event.preventDefault();
        break;
      case KEY_DOWN: case KEY_S:
        this.keysPressed |= DOWN;
        event.preventDefault();
        break;
      case KEY_LEFT: case KEY_A:
        this.keysPressed |= LEFT;
        event.preventDefault();
        break;
      case KEY_RIGHT: case KEY_D:
        this.keysPressed |= RIGHT;
        event.preventDefault();
        break;
      case KEY_X: case KEY_K: case KEY_SPACE:
        this.keysPressed |= ACTION_A;
        event.preventDefault();
        break;
      case KEY_Z: case KEY_J:
        this.keysPressed |= ACTION_B;
        event.preventDefault();
        break;
      }
    });

    addEventListener("keyup", event => {
      const code = event.code || keyCodeMapping[event.keyCode];

      switch (code) {
      case KEY_UP: case KEY_W:
        this.keysPressed &= ~UP;
        event.preventDefault();
        break;
      case KEY_DOWN: case KEY_S:
        this.keysPressed &= ~DOWN;
        event.preventDefault();
        break;
      case KEY_LEFT: case KEY_A:
        this.keysPressed &= ~LEFT;
        event.preventDefault();
        break;
      case KEY_RIGHT: case KEY_D:
        this.keysPressed &= ~RIGHT;
        event.preventDefault();
        break;
      case KEY_X: case KEY_K: case KEY_SPACE:
        this.keysPressed &= ~ACTION_A;
        event.preventDefault();
        break;
      case KEY_Z: case KEY_J:
        this.keysPressed &= ~ACTION_B;
        event.preventDefault();
        break;
      }
    });
  }

  update() {
    this.keysJustPressed = this.keysPressed & ~this.lastPressed;
    this.keysJustReleased = ~this.keysPressed & this.lastPressed;

    this.lastPressed = this.keysPressed;
  }

  pressed(key) {
    return (this.keysPressed & key) === key;
  }

  justPressed(key) {
    return (this.keysJustPressed & key) === key;
  }

  justReleased(key) {
    return (this.keysJustReleased & key) === key;
  }
}
