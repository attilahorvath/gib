precision highp float;

uniform sampler2D tex;

varying float size;
varying vec2 texCoord;

void main() {
  if (size < 0.1) {
    discard;
  }

  vec2 texCoord = mix(
    texCoord,
    texCoord + vec2(FONT_SIZE / TILES_TEXTURE_WIDTH,
                    FONT_SIZE / TILES_TEXTURE_HEIGHT),
    gl_PointCoord
  );

  gl_FragColor = texture2D(tex, texCoord);

  if (gl_FragColor.a < 0.1) {
    discard;
  }
}
