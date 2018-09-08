import InputDevice from "./InputDevice";

export default class extends InputDevice {
  process(gamepad) {
    if (gamepad.buttons[0].pressed || gamepad.buttons[2].pressed) {
      this.pressedMask |= ACTION_A;
    } else if (!gamepad.buttons[0].pressed && !gamepad.buttons[2].pressed) {
      this.pressedMask &= ~ACTION_A;
    }

    if (gamepad.buttons[1].pressed || gamepad.buttons[3].pressed) {
      this.pressedMask |= ACTION_B;
    } else if (!gamepad.buttons[1].pressed && !gamepad.buttons[3].pressed) {
      this.pressedMask &= ~ACTION_B;
    }

    this.x = gamepad.axes[0];
    this.y = gamepad.axes[1];
  }
}
