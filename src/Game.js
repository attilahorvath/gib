import Renderer from './Renderer';
import SpriteSheet from './SpriteSheet';
import Map from './Map';

export default class {
  constructor() {
    this.renderer = new Renderer();

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
