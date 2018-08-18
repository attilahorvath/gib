import Renderer from './Renderer';
import Sprite from './Sprite';

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

export default class {
  constructor() {
    this.renderer = new Renderer(SCREEN_WIDTH, SCREEN_HEIGHT);

    this.sprites = [];
    this.sprites.push(new Sprite(this.renderer, 100, 50, 150, 100, 0.05, 0.01));
    this.sprites.push(new Sprite(this.renderer, 10, 10, 600, 100, -0.05, -0.01));
    this.sprites.push(new Sprite(this.renderer, 100, 100, 10, 380, 0.05, -0.01));
    this.sprites.push(new Sprite(this.renderer, 30, 70, 450, 350, -0.05, 0.01));
    this.sprites.push(new Sprite(this.renderer, 200, 10, 100, 400, 0.05, -0.01));

    this.lastTimestamp = performance.now();
  }

  update(timestamp) {
    const deltaTime = timestamp - this.lastTimestamp;

    this.sprites.forEach(sprite => sprite.update(deltaTime));

    this.lastTimestamp = timestamp;
  }

  render() {
    this.renderer.clear();
    this.sprites.forEach(sprite => sprite.draw());
  }
}
