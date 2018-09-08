import Item from "./Item";

export default class extends Item {
  constructor(game, renderer, map, gib, particleSystem, textLayer, speech) {
    super(renderer, map, gib, particleSystem, textLayer, speech);

    this.game = game;
  }

  collected() {
    this.game.won();
  }
}
