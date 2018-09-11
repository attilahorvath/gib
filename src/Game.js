import Renderer from './Renderer';
import Input from './Input';
import SpriteSheet from './SpriteSheet';
import ParticleSystem from './ParticleSystem';
import TextLayer from './TextLayer';
import Audio from './Audio';
import Map from './Map';
import Title from './Title';
import Start from './Start';
import GameOver from './GameOver';
import Victory from './Victory';
import Timer from './Timer';

export default class {
  constructor() {
    this.renderer = new Renderer(this);
    this.input = new Input();

    this.spriteSheet = new SpriteSheet(this.renderer);
    this.particleSystem = new ParticleSystem(this.renderer);
    this.textLayer = new TextLayer(this.renderer);
    this.audio = new Audio();

    this.load();

    this.title = new Title(this, this.input, this.textLayer, this.audio);

    this.lastTimestamp = 0;
    this.timeAccumulator = 0;

    this.loaded = false;

    this.celebrationTimer = new Timer(Math.random() * 300, () => {
      const x = this.renderer.cameraX + Math.random() * SCREEN_WIDTH;
      const y = this.renderer.cameraY + Math.random() * SCREEN_HEIGHT;

      const type = Math.random();

      let r = 0.0;
      let g = 0.0;
      let b = 0.0;

      if (type < 0.16) {
        r = 0.73;
        g = 0.73;
        b = 0.73;
      } else if (type < 0.33) {
        r = 0.0;
        g = 0.8;
        b = 0.33;
      } else if (type < 0.5) {
        r = 0.0;
        g = 0.0;
        b = 0.66;
      } else if (type < 0.66) {
        r = 0.66;
        g = 1.0;
        b = 0.93;
      } else if (type < 0.83) {
        r = 0.8;
        g = 0.26;
        b = 0.8;
      } else {
        r = 1.0;
        g = 0.46;
        b = 0.46;
      }

      for (let i = 0; i < 80; i++) {
        const angle = (2.0 * Math.PI / 80) * i;

        this.particleSystem.emitParticle(
          x, y,
          r, g, b,
          Math.cos(angle) * 0.1 + (Math.random() - 0.5) * 0.03,
          Math.sin(angle) * 0.1 + (Math.random() - 0.5) * 0.03,
          1000.0
        );
      }

      this.audio.play('sawtooth', 100, 150, 0.2);

      this.celebrationTimer.timeout = Math.random() * 300;
    }, true);

    this.celebrationTimer.enabled = false;
  }

  load() {
    this.spriteSheet.reset();

    this.map = new Map(this, this.renderer, this.spriteSheet, this.input,
                       this.particleSystem, this.textLayer, this.audio);
  }

  update(timestamp) {
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    if (deltaTime > 2500) {
      return;
    }

    this.timeAccumulator += deltaTime;

    while (this.timeAccumulator >= TIME_STEP) {
      if (this.loaded) {
        this.input.update();

        if (!this.title.started) {
          this.title.update();
        } else {
          this.celebrationTimer.update();
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

  start() {
    this.title = new Start(this, this.input, this.textLayer, this.audio);
  }

  over() {
    this.title = new GameOver(this, this.input, this.textLayer, this.audio);
    this.spriteSheet.update();
  }

  won() {
    this.title = new Victory(this, this.input, this.textLayer, this.audio);
    this.celebrationTimer.enabled = true;
  }
}
