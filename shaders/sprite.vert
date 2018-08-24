uniform mat4 projection;
uniform mat4 view;

uniform float spriteSize;

attribute vec3 vertex0Position;
attribute vec2 vertex1TexCoord;

varying vec2 texCoord;

void main() {
  texCoord = vertex1TexCoord;

  gl_Position = projection * view * vec4(vertex0Position, 1.0);
  gl_PointSize = spriteSize;
}
