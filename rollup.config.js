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

      SCREEN_WIDTH: '800.0',
      SCREEN_HEIGHT: '600.0',
      SPRITE_SIZE: '64.0',
      TILE_SIZE: '16.0',
      TILES_TEXTURE: 'textures/tiles.png',
      TILES_TEXTURE_WIDTH: '128.0',
      TILES_TEXTURE_HEIGHT: '32.0'
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
