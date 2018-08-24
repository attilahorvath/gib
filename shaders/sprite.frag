precision highp float;

uniform sampler2D tex;

uniform vec2 tileSize;
uniform vec2 texSize;

varying vec2 texCoord;

void main() {
  vec2 texCoord = mix(
    (tileSize * texCoord) / texSize,
    (tileSize * (texCoord + vec2(1.0, 1.0))) / texSize,
    gl_PointCoord
  );

  gl_FragColor = texture2D(tex, texCoord);

  if (gl_FragColor.a < 0.1) {
    discard;
  }
}
