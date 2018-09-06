import Timer from "./Timer";

export default class {
  constructor() {
    this.active = false;
    this.inactivate = false;

    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;

    this.u = 0.0;
    this.v = 0.0;

    this.tint = 0.0;

    this.oldX = 0.0;
    this.oldY = 0.0;
    this.oldZ = 0.0;

    this.oldU = 0.0;
    this.oldV = 0.0;

    this.oldTint = 0.0;

    this.canFlash = true;

    this.flashTimer = new Timer(100, () => {
      if (this.tint !== 0.0) {
        this.tint = 0.0;
        this.flashTimer.reset();
      } else {
        this.canFlash = true;
      }
    });

    this.flashTimer.enabled = false;
  }

  spawn(x, y, z, u, v, controller, frames) {
    this.active = true;

    this.x = x;
    this.y = y;
    this.z = z;

    this.u = u;
    this.v = v;

    this.tint = 0.0;

    this.oldX = this.x;
    this.oldY = this.y;
    this.oldZ = this.z;

    this.oldU = this.u;
    this.oldV = this.v;

    this.oldTint = this.tint;

    this.canFlash = true;

    if (controller) {
      controller.init(this);

      this.controller = controller;
    }

    if (frames) {
      this.frames = frames;
      this.currentFrame = 0;
      this.frameDirection = -1;

      this.frameTimer = new Timer(100, () => {
        this.currentFrame =
          (this.currentFrame + this.frameDirection) % this.frames.length;

        if (this.currentFrame < 0) {
          this.currentFrame = this.frames.length - 1;
        }

        this.u = this.frames[this.currentFrame][0];
        this.v = this.frames[this.currentFrame][1];
      }, true);
    }
  }

  update() {
    if (this.controller) {
      this.controller.update();
    }

    if (this.frameTimer) {
      this.frameTimer.update();
    }

    this.flashTimer.update();

    if (this.inactivate) {
      this.active = false;
      this.inactivate = false;
    }

    if (!this.active) {
      this.x = 0.0;
      this.y = 0.0;
      this.z = 0.0;

      this.u = 0.0;
      this.v = 0.0;

      this.tint = 0.0;

      this.controller = null;
    }

    const changed = this.oldX !== this.x || this.oldY !== this.y ||
                    this.oldZ !== this.z || this.oldU !== this.u ||
                    this.oldV !== this.v || this.oldTint !== this.tint;

    this.oldX = this.x;
    this.oldY = this.y;
    this.oldZ = this.z;

    this.oldU = this.u;
    this.oldV = this.v;

    this.oldTint = this.tint;

    return changed;
  }

  flash() {
    if (!this.canFlash) {
      return;
    }

    this.canFlash = false;
    this.tint = 1.0;
    this.flashTimer.reset();
  }

  disable() {
    this.inactivate = true;
  }
}
