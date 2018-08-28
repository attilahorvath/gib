import Timer from "./Timer";

export default class {
  constructor() {
    this.active = false;

    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;

    this.u = 0.0;
    this.v = 0.0;
  }

  spawn(x, y, z, u, v, controller, frames) {
    this.active = true;

    this.x = x;
    this.y = y;
    this.z = z;

    this.u = u;
    this.v = v;

    if (controller) {
      controller.sprite = this;

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

    const changed = this.oldX !== this.x || this.oldY !== this.y ||
                    this.oldZ !== this.z || this.oldU !== this.u ||
                    this.oldV !== this.v;

    this.oldX = this.x;
    this.oldY = this.y;
    this.oldZ = this.z;

    this.oldU = this.u;
    this.oldV = this.v;

    return changed;
  }
}
