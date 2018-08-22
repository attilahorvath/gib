precision highp float;

uniform sampler2D tex;

varying vec2 texCoord;

void main() {
  gl_FragColor = texture2D(tex, texCoord);

  if (gl_FragColor.a < 0.1) {
    discard;
  }
}
