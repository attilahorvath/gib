import Item from "./Item";

export default class extends Item {
  collected() {
    this.gib.abilities.elevation = true;

    this.textLayer.titleText = this.textLayer.createSegment(
      150, 220, 'ELEVATION SYSTEM ONLINE', 32, TEXT_ANIMATED, 0, 4000
    );

    this.textLayer.helpText = this.textLayer.createSegment(
      150, 220, 'PRESS X TO JUMP', 32, TEXT_ANIMATED, 4000, 4000
    );

    this.speech.speak('ELEVATION SYSTEM ONLINE');
  }
}
