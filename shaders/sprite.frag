precision highp float;

uniform sampler2D tex;

varying vec2 texCoord;

void main() {
  vec2 texCoord = mix(
    (vec2(TILE_SIZE) * texCoord) /
      vec2(TILES_TEXTURE_WIDTH, TILES_TEXTURE_HEIGHT),
    (vec2(TILE_SIZE) * (texCoord + vec2(1.0))) /
      vec2(TILES_TEXTURE_WIDTH, TILES_TEXTURE_HEIGHT),
    gl_PointCoord
  );

  gl_FragColor = texture2D(tex, texCoord);

  if (gl_FragColor.a < 0.1) {
    discard;
  }
}
