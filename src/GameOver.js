export default class {
  constructor(game, input, textLayer, speech) {
    this.game = game;
    this.input = input;
    this.textLayer = textLayer;
    this.speech = speech;

    textLayer.titleText = textLayer.createCenteredSegment(
      50, 'CRITICAL\nMISSION\nFAILURE', 64, TEXT_ANIMATED
    );

    textLayer.helpText = textLayer.createCenteredSegment(
      500, 'PRESS START TO TRY AGAIN', 32, TEXT_FLASHING, 2000
    );

    this.speech.speak('CRITICAL MISSION FAILURE!');

    this.started = false;
  }

  update() {
    if (this.input.justPressed(ACTION_A)) {
      this.textLayer.titleText = null;
      this.textLayer.helpText = null;

      this.game.load();
      this.started = true;
    }
  }
}
