import Timer from "./Timer";

export default class {
  constructor(input, textLayer, audio) {
    this.input = input;
    this.textLayer = textLayer;
    this.audio = audio;

    textLayer.titleText = textLayer.createCenteredSegment(
      50, 'SYSTEMS OFFLINE', 64, TEXT_ANIMATED
    );

    textLayer.helpText = textLayer.createCenteredSegment(
      200, 'PRESS START TO BEGIN', 32, TEXT_FLASHING, 600
    );

    this.loaded = false;
    this.started = false;

    this.timer = new Timer(1000);
  }

  update() {
    this.timer.update();

    if (!this.loaded) {
      this.audio.speak('SYSTEMS OFFLINE');

      this.loaded = true;
    }

    if (this.input.justPressed(ACTION_A) && !this.timer.enabled) {
      this.textLayer.titleText = null;
      this.textLayer.helpText = null;

      this.started = true;
    }
  }
}
