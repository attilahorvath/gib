import SpriteController from "./SpriteController";

export default class extends SpriteController {
  constructor(renderer, map, input, particleSystem) {
    super(map);

    this.renderer = renderer;
    this.input = input;
    this.particleSystem = particleSystem;

    this.direction = 0.0;
    this.lastDirection = 0.0;
  }

  update(deltaTime) {
    const tileBelow = this.tileAt(this.x, this.y + 1);

    if (tileBelow) {
      this.ay = 0.0;
      this.dy = 0.0;
    } else if (this.tileAt(this.x, this.y - 1)) {
      this.ay = 0.002;
      this.dy = 0.0;
    } else {
      this.ay = 0.002;
    }

    if (this.input.pressed(LEFT)) {
      if (this.ax > 0.0) {
        this.ax = 0.0;
      }

      if (!this.tileAt(this.x - 1, this.y)) {
        this.ax -= 0.0001;
      } else {
        this.dx = 0.0;
        this.ax = 0.0;
      }

      this.direction = -1.0;
      this.lastDirection = 0.0;
    } else if (this.input.pressed(RIGHT)) {
      if (this.ax < 0.0) {
        this.ax = 0.0;
      }

      if (!this.tileAt(this.x + 1, this.y)) {
        this.ax += 0.0001;
      } else {
        this.dx = 0.0;
        this.ax = 0.0;
      }

      this.direction = 1.0;
      this.lastDirection = 0.0;
    } else {
      if (this.direction !== 0.0) {
        this.ax = -this.ax;

        this.lastDirection = this.direction;
        this.direction = 0.0;
      }

      if ((this.lastDirection > 0.0 && this.dx < 0.001) ||
          (this.lastDirection < 0.0 && this.dx > 0.001) ||
          this.tileAt(this.x - 1, this.y) ||
          this.tileAt(this.x + 1, this.y)) {
        this.dx = 0.0;
        this.ax = 0.0;
      }
    }

    if (this.ax > 0.002) {
      this.ax = 0.002;
    } else if (this.ax < -0.002) {
      this.ax = -0.002;
    }

    if (this.input.justPressed(ACTION_A) && this.ay === 0.0) {
      this.dy = -0.8;
    }

    super.update(deltaTime);

    if (this.dx < -0.1) {
      this.kickUpDirt(this.x + SPRITE_SIZE - 3, tileBelow);
    } else if (this.dx > 0.1) {
      this.kickUpDirt(this.x + 2, tileBelow);
    }

    this.sprite.frameTimer.enabled = this.direction !== 0.0;
    this.sprite.frameDirection = Math.sign(this.direction);

    this.renderer.cameraX = this.x + SPRITE_SIZE / 2.0 -
                            SCREEN_WIDTH / 2.0;

    this.renderer.cameraY = this.y + SPRITE_SIZE / 2.0 -
                            SCREEN_HEIGHT / 2.0;
  }

  kickUpDirt(x, tileType) {
    if (!tileType) {
      return;
    }

    const count = Math.random() * 2;

    const r = tileType == '1' ? 0.0 : 0.4;
    const g = tileType == '1' ? 0.8 : 0.27;
    const b = tileType == '1' ? 0.33 : 0.0;

    const direction = x < this.x + SPRITE_SIZE / 2 ? -1 : 1;

    for (let i = 0; i < count; i++) {
      this.particleSystem.emitParticle(
        x, this.y + SPRITE_SIZE - 1,
        r, g, b,
        direction * Math.random() * 0.25, -Math.random() * 0.25
      );
    }
  }
}
