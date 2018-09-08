import Item from "./Item";

export default class extends Item {
  collected() {
    this.gib.abilities.propulsion = true;

    this.textLayer.titleText = this.textLayer.createCenteredSegment(
      220, 'PROPULSION SYSTEM ONLINE', 32, TEXT_ANIMATED, 0, 2500
    );

    this.textLayer.helpText = this.textLayer.createCenteredSegment(
      176, ' USE A GAMEPAD OR\nTHE ARROWS TO MOVE', 32, TEXT_ANIMATED,
      2500, 3500
    );

    this.speech.speak('PROPULSION SYSTEM ONLINE');
  }
}
