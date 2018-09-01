import Item from "./Item";

export default class extends Item {
  collected() {
    this.gib.abilities.excavation = true;

    this.textLayer.titleText = this.textLayer.createSegment(
      150, 220, 'EXCAVATION SYSTEM ONLINE', 32, TEXT_ANIMATED, 0, 4000
    );

    this.textLayer.helpText = this.textLayer.createSegment(
      150, 220, 'HOLD Z TO BREAK BRICKS', 32, TEXT_ANIMATED, 4000, 4000
    );

    this.speech.speak('EXCAVATION SYSTEM ONLINE');
  }
}
