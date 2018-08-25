uniform mat4 projection;
uniform mat4 view;

uniform float time;

attribute vec2 vertex0Position;
attribute vec3 vertex1Color;
attribute vec2 vertex2Velocity;
attribute float vertex3Emitted;

varying vec4 color;

void main() {
  float age = time - vertex3Emitted;
  vec2 position = vertex0Position + vertex2Velocity * age;

  gl_PointSize = PARTICLE_SIZE;
  gl_Position = projection * view * vec4(position, PARTICLE_Z, 1.0);

  color = vec4(vertex1Color, 1.0 - smoothstep(0.0, PARTICLE_LIFETIME, age));
}
