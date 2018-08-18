uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

attribute vec2 vertexPosition;
attribute vec2 vertexTexCoord;

varying vec2 texCoord;

void main() {
  gl_Position = projection * view * model * vec4(vertexPosition, 0.0, 1.0);
  texCoord = vertexTexCoord;
}
