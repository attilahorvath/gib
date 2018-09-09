import Item from "./Item";

export default class extends Item {
  collected() {
    this.gib.abilities.extermination = true;

    this.textLayer.titleText = this.textLayer.createCenteredSegment(
      220, 'EXTERMINATION SYSTEM ONLINE', 32, TEXT_ANIMATED, 0, 2500
    );

    this.textLayer.helpText = this.textLayer.createCenteredSegment(
      220, 'PRESS Z TO FIRE', 32, TEXT_ANIMATED, 2500, 2500
    );

    this.audio.speak('EXTERMINATION SYSTEM ONLINE');
  }
}
