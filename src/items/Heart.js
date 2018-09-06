import Item from "./Item";

export default class extends Item {
  collected() {
    this.gib.lives++;
    this.gib.updateLives();

    this.speech.speak('DAMAGE REPAIRED!');
  }
}
