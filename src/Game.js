import Renderer from './Renderer';
import SpriteSheet from './SpriteSheet';
import Map from './Map';
import Input from './Input';
import ParticleSystem from './ParticleSystem';

export default class {
  constructor() {
    this.renderer = new Renderer(this);
    this.input = new Input();

    this.spriteSheet = new SpriteSheet(this.renderer);
    this.particleSystem = new ParticleSystem(this.renderer);

    this.map = new Map(this.renderer, this.spriteSheet, this.input,
                       this.particleSystem);

    this.lastTimestamp = 0;
    this.timeAccumulator = 0;

    this.started = false;
  }

  update(timestamp) {
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    this.timeAccumulator += deltaTime;

    while (this.timeAccumulator >= TIME_STEP) {
      if (this.started) {
        this.input.update();

        this.spriteSheet.update();
        this.particleSystem.update();

        this.renderer.update();
      }

      this.timeAccumulator -= TIME_STEP;
    }
  }

  render() {
    this.renderer.clear();

    this.spriteSheet.draw();
    this.particleSystem.draw();
  }
}
