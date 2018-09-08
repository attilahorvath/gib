import InputDevice from "./InputDevice";

export default class extends InputDevice {
  process(gamepad) {
    if (gamepad.buttons.filter((_, index) => index % 2 === 0)
                       .some(button => button.pressed)) {
      this.pressedMask |= ACTION_A;
    } else if (gamepad.buttons.filter((_, index) => index % 2 === 0)
                              .every(button => !button.pressed)) {
      this.pressedMask &= ~ACTION_A;
    }

    if (gamepad.buttons.filter((_, index) => index % 2 === 1)
                       .some(button => button.pressed)) {
      this.pressedMask |= ACTION_B;
    } else if (gamepad.buttons.filter((_, index) => index % 2 === 1)
                              .every(button => !button.pressed)) {
      this.pressedMask &= ~ACTION_B;
    }

    this.x = 0.0;
    this.y = 0.0;

    for (let i = 0; i < gamepad.axes.length; i++) {
      if (gamepad.axes[i] !== 0.0) {
        if (i % 2 === 0) {
          this.x = gamepad.axes[i];
        } else {
          this.y = gamepad.axes[i];
        }
      }
    }
  }
}
