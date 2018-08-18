import Shader from './Shader';

export default class {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);

    this.gl = canvas.getContext('webgl');

    this.shader = new Shader(this.gl);

    this.projection = new Float32Array([
      2.0 / (width - 1.0), 0.0, 0.0, 0.0,
      0.0, -2.0 / (height - 1.0), 0.0, 0.0,
      0.0, 0.0, -1.0, 0.0,
      -1.0, 1.0, 0.0, 1.0
    ]);

    this.view = new Float32Array([
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ]);

    this.texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 2, 2, 0,
      this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([
        0, 0, 255, 255,
        255, 0, 0, 255,
        0, 255, 0, 255,
        255, 0, 255, 255
      ]));

    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
  }

  clear() {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.shader.use(this.projection, this.view);
  }

  draw(model, vertexBuffer, indexBuffer, count) {
    this.shader.use(this.projection, this.view);

    this.gl.uniformMatrix4fv(this.shader.model, false, model);

    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    this.gl.drawElements(this.gl.TRIANGLES, count, this.gl.UNSIGNED_SHORT, 0);
  }
}
