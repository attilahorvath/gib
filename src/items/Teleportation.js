import Item from "./Item";

export default class extends Item {
  constructor(game, renderer, map, gib, particleSystem, textLayer, audio) {
    super(renderer, map, gib, particleSystem, textLayer, audio);

    this.game = game;
  }

  collected() {
    this.game.won();
  }
}
