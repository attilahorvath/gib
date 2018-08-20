import Renderer from './Renderer';
import Map from './Map';

const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;

export default class {
  constructor() {
    this.renderer = new Renderer(SCREEN_WIDTH, SCREEN_HEIGHT);

    this.entities = [];

    this.map = new Map(this.renderer, this.entities);

    this.lastTimestamp = performance.now();
  }

  update(timestamp) {
    const deltaTime = timestamp - this.lastTimestamp;

    this.entities.forEach(entity => entity.update(deltaTime));
    this.renderer.update();

    this.lastTimestamp = timestamp;
  }

  render() {
    this.renderer.clear();

    this.map.draw();
    this.entities.forEach(entity => entity.draw());
  }
}
