function numComponents(gl, type) {
  switch (type) {
  case gl.FLOAT:
    return 1;
  case gl.FLOAT_VEC2:
    return 2;
  case gl.FLOAT_VEC3:
    return 3;
  case gl.FLOAT_VEC4:
    return 4;
  case gl.FLOAT_MAT3:
    return 9;
  case gl.FLOAT_MAT4:
    return 16;
  }
}

export default class {
  constructor(gl, vertexShaderSource, fragmentShaderSource) {
    this.gl = gl;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    this.program = gl.createProgram();
    gl.attachShader(this.program, vertexShader);
    gl.attachShader(this.program, fragmentShader);
    gl.linkProgram(this.program);

    this.uniforms = [];

    const numUniforms = gl.getProgramParameter(this.program,
                                               gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < numUniforms; i++) {
      const uniform = gl.getActiveUniform(this.program, i);
      const location = gl.getUniformLocation(this.program, uniform.name);

      this[uniform.name] = null;

      this.uniforms.push(
        { type: uniform.type, name: uniform.name, location: location }
      );
    }

    this.attributes = [];
    this.stride = 0;

    const numAttribs = gl.getProgramParameter(this.program,
                                              gl.ACTIVE_ATTRIBUTES);

    for (let i = 0; i < numAttribs; i++) {
      const attribute = gl.getActiveAttrib(this.program, i);
      const location = gl.getAttribLocation(this.program, attribute.name);
      const components = numComponents(gl, attribute.type);

      this.attributes.push(
        { name: attribute.name, location: location, components: components }
      );

      this.stride += components * 4;
    }
  }

  use() {
    this.gl.useProgram(this.program);

    let offset = 0;

    for (const attribute of this.attributes) {
      this.gl.enableVertexAttribArray(attribute.location);
      this.gl.vertexAttribPointer(attribute.location, attribute.components,
                                  this.gl.FLOAT, false, this.stride, offset);

      offset += attribute.components * 4;
    }

    for (const uniform of this.uniforms) {
      switch (uniform.type) {
      case this.gl.FLOAT:
        this.gl.uniform1f(uniform.location, this[uniform.name]);
        break;
      case this.gl.FLOAT_VEC2:
        this.gl.uniform2fv(uniform.location, this[uniform.name]);
        break;
      case this.gl.FLOAT_MAT2:
        this.gl.uniformMatrix2fv(uniform.location, false, this[uniform.name]);
        break;
      case this.gl.FLOAT_MAT4:
        this.gl.uniformMatrix4fv(uniform.location, false, this[uniform.name]);
        break;
      }
    }
  }
}
