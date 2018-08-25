import map from '../assets/map.txt';
import Gib from './Gib';

export default class {
  constructor(renderer, spriteSheet, input) {
    this.tiles = [];

    const rows = map.split('\n');

    let i = 0;

    for (let y = 0; y < rows.length; y++) {
      this.tiles.push([]);

      for (let x = 0; x < rows[y].length; x++) {
        const type = rows[y][x];

        if (type === ' ') {
          this.tiles[y].push(false);
          continue;
        }

        let u = null;
        let v = 0;

        switch (type) {
        case '1':
          u = 0;
          break;
        case '2':
          u = 1;
          break;
        case 'D':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, 0.9, 0.0, 1.0
          );
          break;
        case 'G':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, 0.7, 3.0, 0.0,
            new Gib(renderer, this, input),
            [[3.0, 0.0], [4.0, 0.0], [5.0, 0.0], [6.0, 0.0]]
          );
          this.gib = new Gib(
            renderer, spriteSheet, this,
            SPRITE_SIZE * x, SPRITE_SIZE * y
          );
          break;
        }

        if (u === null) {
          this.tiles[y].push(false);

          continue;
        }

        spriteSheet.spawnSprite(
          SPRITE_SIZE * x, SPRITE_SIZE * y, 0.1, u, v
        );

        this.tiles[y].push(true);
      }
    }
  }

  isBlocked(x, y) {
    const row = this.tiles[Math.floor(y / SPRITE_SIZE)];

    if (!row) {
      return false;
    }

    return row[Math.floor(x / SPRITE_SIZE)] === true;
  }

  prevTileOffset(x) {
    return (Math.floor(x / SPRITE_SIZE) + 1) * SPRITE_SIZE - x;
  }

  nextTileOffset(x) {
    return x - Math.floor(x / SPRITE_SIZE) * SPRITE_SIZE;
  }
}
