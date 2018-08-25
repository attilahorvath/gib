uniform mat4 projection;
uniform mat4 view;

attribute vec3 vertex0Position;
attribute vec2 vertex1TexCoord;

varying vec2 texCoord;

void main() {
  gl_PointSize = SPRITE_SIZE;
  gl_Position = projection * view * vec4(vertex0Position, 1.0);

  texCoord = vertex1TexCoord;
}
