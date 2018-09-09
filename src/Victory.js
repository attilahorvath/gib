export default class {
  constructor(game, input, textLayer, audio) {
    this.game = game;
    this.input = input;
    this.textLayer = textLayer;
    this.audio = audio;

    textLayer.titleText = textLayer.createCenteredSegment(
      50, 'ALL SYSTEMS\n  ONLINE', 64, TEXT_ANIMATED
    );

    textLayer.helpText = textLayer.createCenteredSegment(
      500, 'CONGRATULATIONS', 32, TEXT_ANIMATED, 1000
    );

    this.audio.speak('ALL SYSTEMS ONLINE! CONGRATULATIONS!');

    this.started = true;
  }

  update() {}
}
