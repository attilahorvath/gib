uniform mat4 projection;

attribute vec2 vertex0Position;
attribute vec2 vertex1TexCoord;
attribute float vertex2Size;

varying float size;
varying vec2 texCoord;

void main() {
  gl_PointSize = vertex2Size;
  gl_Position = projection * vec4(vertex0Position, TEXT_Z, 1.0);

  size = vertex2Size;
  texCoord = vertex1TexCoord;
}
