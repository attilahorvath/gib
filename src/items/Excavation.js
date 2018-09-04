import Item from "./Item";

export default class extends Item {
  collected() {
    this.gib.abilities.excavation = true;

    this.textLayer.titleText = this.textLayer.createCenteredSegment(
      220, 'EXCAVATION SYSTEM ONLINE', 32, TEXT_ANIMATED, 0, 2500
    );

    this.textLayer.helpText = this.textLayer.createCenteredSegment(
      220, 'HOLD Z TO BREAK BRICKS', 32, TEXT_ANIMATED, 2500, 2500
    );

    this.speech.speak('EXCAVATION SYSTEM ONLINE');
  }
}
