export default class {
  constructor(timeout, callback = null, repeating = false) {
    this.timeout = timeout;
    this.callback = callback;
    this.repeating = repeating;

    this.progress = 0;
    this.enabled = true;
  }

  update() {
    if (!this.enabled) {
      return;
    }

    this.progress += TIME_STEP;

    if (this.progress >= this.timeout) {
      if (this.repeating) {
        this.progress -= this.timeout;
      } else {
        this.enabled = false;
      }

      if (this.callback) {
        this.callback();
      }
    }
  }

  reset() {
    this.enabled = true;
    this.progress = 0;
  }
}
