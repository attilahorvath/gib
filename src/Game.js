import Renderer from './Renderer';
import SpriteSheet from './SpriteSheet';
import Map from './Map';

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

export default class {
  constructor() {
    this.renderer = new Renderer(SCREEN_WIDTH, SCREEN_HEIGHT);

    this.spriteSheet = new SpriteSheet(this.renderer);

    this.map = new Map(this.renderer, this.spriteSheet);

    this.lastTimestamp = performance.now();
  }

  update(timestamp) {
    const deltaTime = timestamp - this.lastTimestamp;

    this.spriteSheet.update(deltaTime);
    this.renderer.update();

    this.lastTimestamp = timestamp;
  }

  render() {
    this.renderer.clear();

    this.spriteSheet.draw();
  }
}
