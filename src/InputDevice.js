export default class {
  constructor(index = null) {
    this.index = index;

    this.pressedMask = 0;
    this.lastPressedMask = 0;
    this.justPressedMask = 0;
    this.justReleasedMask = 0;

    this.x = 0.0;
    this.y = 0.0;
  }

  update() {
    this.justPressedMask = this.pressedMask & ~this.lastPressedMask;
    this.justReleasedMask = ~this.pressedMask & this.lastPressedMask;

    this.lastPressedMask = this.pressedMask;
  }

  pressed(code) {
    return (this.pressedMask & code) === code;
  }

  justPressed(code) {
    return (this.justPressedMask & code) === code;
  }

  justReleased(code) {
    return (this.justReleasedMask & code) === code;
  }
}
