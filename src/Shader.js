import vertexShaderSource from '../shaders/texture.vert';
import fragmentShaderSource from '../shaders/texture.frag';

export default class {
  constructor(gl) {
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

    this.projection = gl.getUniformLocation(this.program, 'projection');
    this.view = gl.getUniformLocation(this.program, 'view');
    this.model = gl.getUniformLocation(this.program, 'model');

    this.vertexPosition = gl.getAttribLocation(this.program, 'vertexPosition');
    this.vertexTexCoord = gl.getAttribLocation(this.program, 'vertexTexCoord');
  }

  use(projection, view) {
    this.gl.useProgram(this.program);

    this.gl.enableVertexAttribArray(this.vertexPosition);
    this.gl.enableVertexAttribArray(this.vertexTexCoord);

    this.gl.vertexAttribPointer(this.vertexPosition, 2, this.gl.FLOAT, false,
                                16, 0);
    this.gl.vertexAttribPointer(this.vertexTexCoord, 2, this.gl.FLOAT, false,
                                16, 8);

    this.gl.uniformMatrix4fv(this.projection, false, projection);
    this.gl.uniformMatrix4fv(this.view, false, view);
  }
}
