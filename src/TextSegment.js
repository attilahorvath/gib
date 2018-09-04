import Timer from "./Timer";

export default class {
  constructor(textLayer, chars, size, style, timeOffset, timeout) {
    this.textLayer = textLayer;
    this.size = size;
    this.chars = chars;

    this.visible = true;
    this.lastVisible = true;

    if (style === TEXT_ANIMATED) {
      for (const char of this.chars) {
        char.size = 0;
      }

      this.nextChar = 0;

      this.timer = new Timer(70, () => {
        if (this.nextChar >= this.chars.length) {
          this.timer.enabled = false;
        } else {
          this.chars[this.nextChar].size = this.size;

          for (const char of this.chars) {
            this.textLayer.updateChar(char);
          }

          this.nextChar++;
        }
      }, true);
    } else if (style === TEXT_FLASHING) {
      for (const char of this.chars) {
        char.size = 0;
      }

      this.timer = new Timer(500, () => {
        this.visible = !this.visible;
      }, true);
    }

    if (this.timer && timeOffset) {
      this.timer.enabled = false;

      this.startTimer = new Timer(timeOffset, () => {
        this.timer.enabled = true;

        if (this.endTimer) {
          this.endTimer.enabled = true;
        }
      });
    }

    for (const char of this.chars) {
      this.textLayer.updateChar(char);
    }

    if (timeout) {
      this.endTimer = new Timer(timeout, () => {
        this.hide();
      });

      if (this.startTimer) {
        this.endTimer.enabled = false;
      }
    }
  }

  update() {
    if (this.startTimer) {
      this.startTimer.update();
    }

    if (this.timer) {
      this.timer.update();
    }

    if (this.endTimer) {
      this.endTimer.update();
    }

    if (this.visible && !this.lastVisible) {
      for (const char of this.chars) {
        char.size = this.size;

        this.textLayer.updateChar(char);
      }
    } else if (!this.visible && this.lastVisible) {
      for (const char of this.chars) {
        char.size = 0;

        this.textLayer.updateChar(char);
      }
    }

    this.lastVisible = this.visible;
  }

  hide() {
    this.visible = false;

    for (const char of this.chars) {
      char.size = 0;

      this.textLayer.updateChar(char);
    }

    if (this.startTimer) {
      this.startTimer.enabled = false;
    }

    if (this.timer) {
      this.timer.enabled = false;
    }

    if (this.endTimer) {
      this.endTimer.enabled = false;
    }
  }
}
