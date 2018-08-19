import Renderer from './Renderer';
import Map from './Map';
import Sprite from './Sprite';
import Player from './Player';

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

export default class {
  constructor() {
    this.renderer = new Renderer(SCREEN_WIDTH, SCREEN_HEIGHT);

    this.map = new Map(this.renderer);

    this.sprites = [];
    this.sprites.push(new Sprite(this.renderer, 100, 50, 50, 100, 0, 0.0, 0.0));
    this.sprites.push(new Sprite(this.renderer, 10, 10, 600, 100, 0, 0.0, 0.0));
    this.sprites.push(new Sprite(this.renderer, 200, 10, 100, 120, 0.9, 0.0, 0.0));
    this.sprites.push(new Player(this.renderer, 100, 100));
    this.sprites.push(new Sprite(this.renderer, 100, 100, 10, 80, 0.5, 0.0, 0.0));
    this.sprites.push(new Sprite(this.renderer, 30, 70, 450, 350, 0, 0.0, 0.0));

    this.lastTimestamp = performance.now();
  }

  update(timestamp) {
    const deltaTime = timestamp - this.lastTimestamp;

    this.sprites.forEach(sprite => sprite.update(deltaTime));

    this.lastTimestamp = timestamp;
  }

  render() {
    this.renderer.clear();

    this.map.draw();
    // this.sprites.forEach(sprite => sprite.draw());
  }
}
