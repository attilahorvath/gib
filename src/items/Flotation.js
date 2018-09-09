import Item from "./Item";

export default class extends Item {
  collected() {
    this.gib.abilities.flotation = true;

    this.textLayer.titleText = this.textLayer.createCenteredSegment(
      220, 'FLOTATION SYSTEM ONLINE', 32, TEXT_ANIMATED, 0, 2500
    );

    this.textLayer.helpText = this.textLayer.createCenteredSegment(
      220, 'PRESS X AGAIN TO JUMP HIGHER', 32, TEXT_ANIMATED, 2500, 2500
    );

    this.audio.speak('FLOTATION SYSTEM ONLINE');
  }
}
