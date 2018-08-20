uniform mat4 projection;
uniform mat4 view;
uniform mat4 model;

uniform mat2 texBounds;

attribute vec2 vertexPosition;
attribute vec2 vertexTexCoord;

varying vec2 texCoord;

void main() {
  gl_Position = projection * view * model * vec4(vertexPosition, 0.0, 1.0);

  texCoord = vec2(
    mix(texBounds[0][0], texBounds[0][1], vertexTexCoord.x),
    mix(texBounds[1][0], texBounds[1][1], vertexTexCoord.y)
  );
}
