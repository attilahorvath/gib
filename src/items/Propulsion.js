import Item from "./Item";

export default class extends Item {
  collected() {
    this.gib.abilities.propulsion = true;

    this.textLayer.titleText = this.textLayer.createSegment(
      150, 220, 'PROPULSION SYSTEM ONLINE', 32, TEXT_ANIMATED, 0, 4000
    );

    this.textLayer.helpText = this.textLayer.createSegment(
      150, 220, 'USE THE ARROWS TO MOVE', 32, TEXT_ANIMATED, 4000, 4000
    );

    this.speech.speak('PROPULSION SYSTEM ONLINE');
  }
}
