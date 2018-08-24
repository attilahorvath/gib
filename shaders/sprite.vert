uniform mat4 projection;
uniform mat4 view;

uniform float spriteSize;

attribute vec3 vertexPosition;
attribute vec2 vertexTexCoord;

varying vec2 texCoord;

void main() {
  texCoord = vertexTexCoord;

  gl_Position = projection * view * vec4(vertexPosition, 1.0);
  gl_PointSize = spriteSize;
}
