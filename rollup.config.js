import glsl from 'rollup-plugin-glsl';
import { terser } from 'rollup-plugin-terser';
import string from 'rollup-plugin-string';

export default {
  input: 'src/index.js',
  output: {
    file: 'build/index.js',
    format: 'iife'
  },
  plugins: [
    string({
      include: 'assets/**/*.txt'
    }),
    glsl({
      include: 'shaders/**/*'
    }),
    terser()
  ]
}
