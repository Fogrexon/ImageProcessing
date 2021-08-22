const createVBO = (
  gl: WebGLRenderingContext,
  data: number[],
): WebGLBuffer => {
  const vbo: WebGLBuffer = <WebGLBuffer>gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return vbo;
};

const VERTEX_ARRAY = [
  0, 0, 0,
  0, 1, 0,
  1, 1, 0,
  0, 0, 0,
  1, 1, 0,
  1, 0, 0,
];

const UV_ARRAY = [
  0, 0,
  0, 1,
  1, 1,
  0, 0,
  1, 1,
  1, 0,
];

class FullScreenQuad {
  private positionLocation: number = -1;

  private positionVBO: WebGLBuffer | null = null;

  private uvLocation: number = -1;

  private uvVBO: WebGLBuffer | null = null;

  public init(gl: WebGLRenderingContext, program: WebGLProgram) {
    this.positionLocation = gl.getAttribLocation(program, 'position');
    this.positionVBO = createVBO(gl, VERTEX_ARRAY);

    this.uvLocation = gl.getAttribLocation(program, 'uv');
    this.uvVBO = createVBO(gl, UV_ARRAY);
  }

  public render(gl: WebGLRenderingContext) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionVBO);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvVBO);
    gl.enableVertexAttribArray(this.uvLocation);
    gl.vertexAttribPointer(this.uvLocation, 2, gl.FLOAT, false, 0, 0);
  }
}

export { FullScreenQuad };
