export default class {
  constructor(game, input, textLayer, speech) {
    this.game = game;
    this.input = input;
    this.textLayer = textLayer;
    this.speech = speech;

    textLayer.titleText = textLayer.createCenteredSegment(
      50, 'ALL SYSTEMS\n  ONLINE', 64, TEXT_ANIMATED
    );

    textLayer.helpText = textLayer.createCenteredSegment(
      500, 'CONGRATULATIONS', 32, TEXT_ANIMATED, 1000
    );

    this.speech.speak('ALL SYSTEMS ONLINE! CONGRATULATIONS!');

    this.started = true;
  }

  update() {}
}
