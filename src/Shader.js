function components(type) {
  switch (type) {
  case 'float':
    return 1;
  case 'vec2':
    return 2;
  case 'vec3':
    return 3;
  case 'vec4':
    return 4;
  case 'mat3':
    return 9;
  case 'mat4':
    return 16;
  }
}

function parseShader(combinedShaders, pattern) {
  let matchResult;
  const result = [];

  while ((matchResult = pattern.exec(combinedShaders)) !== null) {
    result.push(
      { type: matchResult[2], name: matchResult[3],
        components: components(matchResult[2]) }
    );
  }

  return result;
}

export default class {
  constructor(gl, vertexShaderSource, fragmentShaderSource) {
    this.gl = gl;

    const combinedShaders = `${vertexShaderSource}\n${fragmentShaderSource}`;

    this.uniforms = parseShader(combinedShaders,
                                /uniform\s+(\w+\s+)*(\w+)\s+(\w+)\s*;/g);

    this.attributes = parseShader(combinedShaders,
                                  /attribute\s+(\w+\s+)*(\w+)\s+(\w+)\s*;/g);

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

    for (const uniform of this.uniforms) {
      this[uniform.name] = null;

      uniform.location = gl.getUniformLocation(this.program, uniform.name);
    }

    this.stride = 0;

    for (const attribute of this.attributes) {
      attribute.location = gl.getAttribLocation(this.program, attribute.name);

      this.stride += attribute.components * 4;
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
      case 'mat2':
        this.gl.uniformMatrix2fv(uniform.location, false, this[uniform.name]);
        break;
      case 'mat4':
        this.gl.uniformMatrix4fv(uniform.location, false, this[uniform.name]);
        break;
      }
    }
  }
}
