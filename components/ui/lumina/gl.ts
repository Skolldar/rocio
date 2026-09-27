// Minimal WebGL renderer for the hero: one full-screen quad and one shader.
// Replaces Three.js, which cost ~600 KB of script and seconds of main-thread
// time just to draw two textures through a fragment shader.

export interface SlideTexture {
  texture: WebGLTexture;
  size: [number, number];
}

const VERTEX_SHADER = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const compile = (gl: WebGLRenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Could not create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed: ${log}`);
  }
  return shader;
};

export class QuadRenderer {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private buffer: WebGLBuffer | null;
  private locations = new Map<string, WebGLUniformLocation | null>();
  private textures: WebGLTexture[] = [];
  // Sampler uniforms are bound to fixed texture units in declaration order.
  private samplerUnits = new Map<string, number>();

  constructor(private canvas: HTMLCanvasElement, fragmentSource: string, samplers: string[]) {
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false });
    if (!gl) throw new Error("WebGL unavailable");
    this.gl = gl;

    const program = gl.createProgram();
    if (!program) throw new Error("Could not create program");
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, `precision highp float;\n${fragmentSource}`));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Program link failed: ${gl.getProgramInfoLog(program)}`);
    }
    this.program = program;
    gl.useProgram(program);

    // Two triangles covering clip space.
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    samplers.forEach((name, unit) => {
      this.samplerUnits.set(name, unit);
      gl.uniform1i(this.location(name), unit);
    });
  }

  private location(name: string) {
    if (!this.locations.has(name)) this.locations.set(name, this.gl.getUniformLocation(this.program, name));
    return this.locations.get(name) ?? null;
  }

  setSize(width: number, height: number, pixelRatio: number) {
    this.canvas.width = Math.round(width * pixelRatio);
    this.canvas.height = Math.round(height * pixelRatio);
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  setFloat(name: string, value: number) {
    this.gl.uniform1f(this.location(name), value);
  }

  setInt(name: string, value: number) {
    this.gl.uniform1i(this.location(name), value);
  }

  setVec2(name: string, [x, y]: [number, number]) {
    this.gl.uniform2f(this.location(name), x, y);
  }

  setTexture(name: string, texture: WebGLTexture) {
    const unit = this.samplerUnits.get(name);
    if (unit === undefined) return;
    this.gl.activeTexture(this.gl.TEXTURE0 + unit);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
  }

  createTexture(img: HTMLImageElement): SlideTexture {
    const gl = this.gl;
    const texture = gl.createTexture();
    if (!texture) throw new Error("Could not create texture");
    gl.activeTexture(gl.TEXTURE0 + this.samplerUnits.size);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // Images are top-down; the quad's UVs are bottom-up.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    // Non-power-of-two textures in WebGL1 require clamping and no mipmaps.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    this.textures.push(texture);
    return { texture, size: [img.naturalWidth, img.naturalHeight] };
  }

  render() {
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }

  dispose() {
    const gl = this.gl;
    this.textures.forEach((t) => gl.deleteTexture(t));
    gl.deleteBuffer(this.buffer);
    gl.deleteProgram(this.program);
  }
}
