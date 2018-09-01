export default class {
  constructor(input, textLayer, speech) {
    this.input = input;
    this.textLayer = textLayer;
    this.speech = speech;

    textLayer.titleText = textLayer.createSegment(
      35, 50, 'SYSTEMS OFFLINE', 64, TEXT_ANIMATED
    );

    textLayer.helpText = textLayer.createSegment(
      200, 200, 'PRESS START TO BEGIN', 32, TEXT_FLASHING, 2000
    );

    this.loaded = false;
    this.started = false;
  }

  update() {
    if (!this.loaded) {
      this.speech.speak('SYSTEMS OFFLINE');

      this.loaded = true;
    }

    if (this.input.justPressed(ACTION_A)) {
      this.textLayer.titleText = null;
      this.textLayer.helpText = null;

      this.started = true;
    }
  }
}
