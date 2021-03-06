import Item from "./Item";

export default class extends Item {
  collected() {
    this.gib.abilities.elevation = true;

    this.textLayer.titleText = this.textLayer.createCenteredSegment(
      220, 'ELEVATION SYSTEM ONLINE', 32, TEXT_ANIMATED, 0, 2500
    );

    this.textLayer.helpText = this.textLayer.createCenteredSegment(
      220, 'PRESS X TO JUMP', 32, TEXT_ANIMATED, 2500, 2500
    );

    this.audio.speak('ELEVATION SYSTEM ONLINE');
  }
}
