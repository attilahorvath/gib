precision highp float;

uniform sampler2D tex;

varying vec2 texCoord;
varying float tint;

void main() {
  if (gl_FragCoord.z == 0.5) {
    discard;
  }

  vec2 texCoord = mix(
    (vec2(TILE_SIZE) * texCoord) /
      vec2(TILES_TEXTURE_WIDTH, TILES_TEXTURE_HEIGHT),
    (vec2(TILE_SIZE) * (texCoord + vec2(1.0))) /
      vec2(TILES_TEXTURE_WIDTH, TILES_TEXTURE_HEIGHT),
    gl_PointCoord
  );

  vec4 texel = texture2D(tex, texCoord);

  gl_FragColor = vec4(texel.rgb + vec3(tint), texel.a);

  if (gl_FragColor.a < 0.1) {
    discard;
  }
}
