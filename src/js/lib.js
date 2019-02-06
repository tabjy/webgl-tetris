function getWebGlCtx (canvasEle) {
  if (!window.WebGLRenderingContext) {
    throw new Error('this browser does not support WebGL')
  }

  const gl = canvasEle.getContext('webgl')
  if (!gl) {
    throw new Error('failed to get WebGL context')
  }

  return gl
}

function loadShader (gl, type, src) {
  const shader = gl.createShader(type)

  gl.shaderSource(shader, src)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const err = new Error(`an error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`)
    gl.deleteShader(shader)
    throw err
  }

  return shader
}

function initShaderProgram (gl, vertSrc, fragSrc) {
  const vert = loadShader(gl, gl.VERTEX_SHADER, vertSrc)
  const frag = loadShader(gl, gl.FRAGMENT_SHADER, fragSrc)

  const program = gl.createProgram()
  gl.attachShader(program, vert)
  gl.attachShader(program, frag)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`unable to init the shader program: ${gl.getProgramInfoLog(program)}`)
  }

  return program
}

export { getWebGlCtx, initShaderProgram }
