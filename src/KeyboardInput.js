import InputDevice from "./InputDevice";

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

export default class extends InputDevice {
  constructor() {
    super();

    addEventListener("keydown", event => {
      const code = event.code || keyCodeMapping[event.keyCode];

      switch (code) {
      case KEY_UP: case KEY_W:
        this.y = -1.0;
        event.preventDefault();
        break;
      case KEY_DOWN: case KEY_S:
        this.y = 1.0;
        event.preventDefault();
        break;
      case KEY_LEFT: case KEY_A:
        this.x = -1.0;
        event.preventDefault();
        break;
      case KEY_RIGHT: case KEY_D:
        this.x = 1.0;
        event.preventDefault();
        break;
      case KEY_X: case KEY_K: case KEY_SPACE:
        this.pressedMask |= ACTION_A;
        event.preventDefault();
        break;
      case KEY_Z: case KEY_J:
        this.pressedMask |= ACTION_B;
        event.preventDefault();
        break;
      }
    });

    addEventListener("keyup", event => {
      const code = event.code || keyCodeMapping[event.keyCode];

      switch (code) {
      case KEY_UP: case KEY_W:
        this.y = 0.0
        event.preventDefault();
        break;
      case KEY_DOWN: case KEY_S:
        this.y = 0.0;
        event.preventDefault();
        break;
      case KEY_LEFT: case KEY_A:
        this.x = 0.0;
        event.preventDefault();
        break;
      case KEY_RIGHT: case KEY_D:
        this.x = 0.0;
        event.preventDefault();
        break;
      case KEY_X: case KEY_K: case KEY_SPACE:
        this.pressedMask &= ~ACTION_A;
        event.preventDefault();
        break;
      case KEY_Z: case KEY_J:
        this.pressedMask &= ~ACTION_B;
        event.preventDefault();
        break;
      }
    });
  }
}
