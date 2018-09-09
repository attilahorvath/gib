import map from '../assets/map.txt';
import Gib from './Gib';
import Brick from './Brick';
import Rock from './enemies/Rock';
import WormHead from './enemies/WormHead';
import Boss from './enemies/Boss';
import BossSegment from './enemies/BossSegment';
import BossEye from './enemies/BossEye';
import Propulsion from './items/Propulsion';
import Elevation from './items/Elevation';
import Excavation from './items/Excavation';
import Extermination from './items/Extermination';
import Flotation from './items/Flotation';
import Heart from './items/Heart';

export default class {
  constructor(game, renderer, spriteSheet, input, particleSystem, textLayer,
              audio) {
    const gib = new Gib(game, renderer, this, spriteSheet, input,
                        particleSystem, textLayer, audio);

    this.boss = new Boss(game, renderer, this, spriteSheet, gib, particleSystem,
                         textLayer, audio);

    this.tiles = [];

    const rows = map.split('\n');

    let i = 0;

    for (let y = 0; y < rows.length; y++) {
      this.tiles.push([]);

      for (let x = 0; x < rows[y].length; x++) {
        const type = rows[y][x];

        let u = null;
        let v = 0;
        let controller = null;

        let segment = null;

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
          controller = new Brick(renderer, this, particleSystem);
          break;
        case 'R':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, DECAL_Z, 6.0, 0.0,
            new Rock(renderer, this, gib, particleSystem, audio)
          );
          break;
        case 'W':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y + 8, MAP_Z, 7.0, 0.0,
            new WormHead(renderer, this, spriteSheet, gib, particleSystem,
                         audio)
          );
          break;
        case '/':
          segment = new BossSegment(this, particleSystem);
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, MAP_Z, 4.0, 2.0, segment
          );
          this.boss.segments.push(segment);
          break;
        case '\\':
          segment = new BossSegment(this, particleSystem);
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, MAP_Z, 5.0, 2.0, segment
          );
          this.boss.segments.push(segment);
          break;
        case 'S':
          segment = new BossSegment(this, particleSystem);
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, MAP_Z, 6.0, 2.0, segment
          );
          this.boss.segments.push(segment);
          break;
        case 'O':
          const eye = new BossEye(this, this.boss, gib, spriteSheet,
                                  particleSystem, audio);
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, MAP_Z, 7.0, 2.0, eye
          );
          this.boss.eyes.push(eye);
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
                           audio)
          );
          break;
        case 'E':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, DECAL_Z, 3.0, 1.0,
            new Elevation(renderer, this, gib, particleSystem, textLayer,
                          audio)
          );
          break;
        case 'X':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, DECAL_Z, 4.0, 1.0,
            new Excavation(renderer, this, gib, particleSystem, textLayer,
                           audio)
          );
          break;
        case 'L':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, DECAL_Z, 5.0, 1.0,
            new Extermination(renderer, this, gib, particleSystem, textLayer,
                              audio)
          );
          break;
        case 'F':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, DECAL_Z, 6.0, 1.0,
            new Flotation(renderer, this, gib, particleSystem, textLayer,
                          audio)
          );
          break;
        case 'T':
          this.boss.teleportationX = SPRITE_SIZE * x;
          this.boss.teleportationY = SPRITE_SIZE * y;
          break;
        case 'H':
          spriteSheet.spawnSprite(
            SPRITE_SIZE * x, SPRITE_SIZE * y, DECAL_Z, 2.0, 2.0,
            new Heart(renderer, this, gib, particleSystem, textLayer,
                      audio)
          );
          break;
        }

        if (u === null) {
          this.tiles[y].push(null);

          continue;
        }

        spriteSheet.spawnSprite(
          SPRITE_SIZE * x, SPRITE_SIZE * y, MAP_Z, u, v, controller
        );

        this.tiles[y].push(controller || type);
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

  setTileAt(x, y, type) {
    const row = this.tiles[Math.floor(y / SPRITE_SIZE)];

    if (!row) {
      return;
    }

    row[Math.floor(x / SPRITE_SIZE)] = type;
  }

  prevTileOffset(x) {
    return (Math.floor(x / SPRITE_SIZE) + 1) * SPRITE_SIZE - x;
  }

  nextTileOffset(x) {
    return x - Math.floor(x / SPRITE_SIZE) * SPRITE_SIZE;
  }
}
