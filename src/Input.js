import KeyboardInput from "./KeyboardInput";
import GamepadInput from "./GamepadInput";

export default class {
  constructor() {
    this.devices = [new KeyboardInput()];

    this.x = 0.0;
    this.y = 0.0;
  }

  update() {
    for (const gamepad of navigator.getGamepads()) {
      if (!gamepad) {
        continue;
      }

      let gamepadInput =
        this.devices.find(device => device.index === gamepad.index);

      if (!gamepadInput) {
        gamepadInput = new GamepadInput(gamepad.index);
        this.devices.push(gamepadInput);
      }

      gamepadInput.process(gamepad);
    }

    for (const device of this.devices) {
      device.update();
    }

    const deviceX = this.devices.find(device => device.x !== 0.0);
    this.x = deviceX ? deviceX.x : 0.0;

    const deviceY = this.devices.find(device => device.y !== 0.0);
    this.y = deviceY ? deviceY.y : 0.0;
  }

  pressed(code) {
    return this.devices.some(device => device.pressed(code));
  }

  justPressed(code) {
    return this.devices.some(device => device.justPressed(code));
  }

  justReleased(code) {
    return this.devices.some(device => device.justReleased(code));
  }
}
