import Renderer from './Renderer';
import Input from './Input';
import SpriteSheet from './SpriteSheet';
import ParticleSystem from './ParticleSystem';
import TextLayer from './TextLayer';
import Speech from './Speech';
import Map from './Map';
import Title from './Title';

export default class {
  constructor() {
    this.renderer = new Renderer(this);
    this.input = new Input();

    this.spriteSheet = new SpriteSheet(this.renderer);
    this.particleSystem = new ParticleSystem(this.renderer);
    this.textLayer = new TextLayer(this.renderer);
    this.speech = new Speech();

    this.map = new Map(this.renderer, this.spriteSheet, this.input,
                       this.particleSystem, this.textLayer, this.speech);

    this.title = new Title(this.input, this.textLayer, this.speech);

    this.lastTimestamp = 0;
    this.timeAccumulator = 0;

    this.loaded = false;
  }

  update(timestamp) {
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    this.timeAccumulator += deltaTime;

    while (this.timeAccumulator >= TIME_STEP) {
      if (this.loaded) {
        this.input.update();

        if (!this.title.started) {
          this.title.update();
        } else {
          this.spriteSheet.update();
        }

        this.particleSystem.update();
        this.textLayer.update();

        this.renderer.update();
      }

      this.timeAccumulator -= TIME_STEP;
    }
  }

  render() {
    this.renderer.clear();

    this.spriteSheet.draw();
    this.particleSystem.draw();
    this.textLayer.draw();
  }
}
