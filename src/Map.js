import map from '../assets/map.txt';
import Gib from './Gib';
import Rock from './enemies/Rock';
import Propulsion from './items/Propulsion';
import Elevation from './items/Elevation';
import Excavation from './items/Excavation';

export default class {
  constructor(renderer, spriteSheet, input, particleSystem, textLayer, speech) {
    const gib = new Gib(renderer, this, input, particleSystem);

    this.tiles = [];

    const rows = map.split('\n');

    let i = 0;

    for (let y = 0; y < rows.length; y++) {
      this.tiles.push([]);

      for (let x = 0; x < rows[y].length; x++) {
        const type = rows[y][x];

        let u = null;
        let v = 0;

        switch (type) {
        case '1':
          u = 0;
          break;
        case '2':
          u = 1;
          break;
        case 'B':
          u = 1;
          v = 1;
          break;
        case 'R':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, DECAL_Z, 6.0, 0.0,
            new Rock(renderer, this, gib, particleSystem)
          );
          break;
        case 'D':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, DECAL_Z, 0.0, 1.0
          );
          break;
        case 'G':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, GIB_Z, 2.0, 0.0, gib,
            [[2.0, 0.0], [3.0, 0.0], [4.0, 0.0], [5.0, 0.0]]
          );
          break;
        case 'P':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, DECAL_Z, 2.0, 1.0,
            new Propulsion(renderer, this, gib, particleSystem, textLayer,
                           speech)
          );
          break;
        case 'E':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, DECAL_Z, 3.0, 1.0,
            new Elevation(renderer, this, gib, particleSystem, textLayer,
                          speech)
          );
          break;
        case 'X':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, DECAL_Z, 4.0, 1.0,
            new Excavation(renderer, this, gib, particleSystem, textLayer,
                           speech)
          );
          break;
        }

        if (u === null) {
          this.tiles[y].push(null);

          continue;
        }

        spriteSheet.spawnSprite(
          SPRITE_SIZE * x, SPRITE_SIZE * y, MAP_Z, u, v
        );

        this.tiles[y].push(type);
      }
    }
  }

  tileAt(x, y) {
    const row = this.tiles[Math.floor(y / SPRITE_SIZE)];

    if (!row) {
      return null;
    }

    return row[Math.floor(x / SPRITE_SIZE)];
  }

  prevTileOffset(x) {
    return (Math.floor(x / SPRITE_SIZE) + 1) * SPRITE_SIZE - x;
  }

  nextTileOffset(x) {
    return x - Math.floor(x / SPRITE_SIZE) * SPRITE_SIZE;
  }
}
