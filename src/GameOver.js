import Timer from "./Timer";

export default class {
  constructor(game, input, textLayer, audio) {
    this.game = game;
    this.input = input;
    this.textLayer = textLayer;
    this.audio = audio;

    textLayer.titleText = textLayer.createCenteredSegment(
      50, 'CRITICAL\nMISSION\nFAILURE', 64, TEXT_ANIMATED
    );

    textLayer.helpText = textLayer.createCenteredSegment(
      500, 'PRESS START TO TRY AGAIN', 32, TEXT_FLASHING, 2000
    );

    this.audio.speak('CRITICAL MISSION FAILURE!');

    this.started = false;

    this.timer = new Timer(2500);
  }

  update() {
    this.timer.update();

    if (this.input.justPressed(ACTION_A) && !this.timer.enabled) {
      this.textLayer.titleText = null;
      this.textLayer.helpText = null;

      this.game.load();
      this.started = true;
    }
  }
}
