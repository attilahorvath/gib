import replace from 'rollup-plugin-replace';
import string from 'rollup-plugin-string';
import glsl from 'rollup-plugin-glsl';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: {
    file: 'build/index.js',
    format: 'iife'
  },
  plugins: [
    replace({
      include: [
        'src/**/*.js',
        'shaders/**/*.{vert,frag}'
      ],

      TIME_STEP: '(1000.0 / 60.0)',

      SCREEN_WIDTH: '1024.0',
      SCREEN_HEIGHT: '600.0',

      SPRITE_SIZE: '64.0',

      TILE_SIZE: '16.0',
      TILES_TEXTURE: 'textures/tiles.png',
      TILES_TEXTURE_WIDTH: '128.0',
      TILES_TEXTURE_HEIGHT: '64.0',

      UP:       '0b0000001',
      DOWN:     '0b0000010',
      LEFT:     '0b0000100',
      RIGHT:    '0b0001000',
      ACTION_A: '0b0100000',
      ACTION_B: '0b1000000',

      PARTICLE_SIZE: '4.0',

      FONT_SIZE: '8.0',
      FONT_TEXTURE_OFFSET: '48.0',

      MAP_Z: '0.1',
      GIB_Z: '0.7',
      DECAL_Z: '0.8',
      PARTICLE_Z: '0.9',
      TEXT_Z: '0.95',

      FLOAT_SIZE: '4',

      TEXT_FLASHING: '0',
      TEXT_ANIMATED: '1'
    }),
    string({
      include: 'assets/**/*.txt'
    }),
    glsl({
      include: 'shaders/**/*.{vert,frag}'
    }),
    terser()
  ]
}
