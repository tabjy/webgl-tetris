import Component from './component'
import Mesh from './mesh'
import AssetManager from './asset_manager'
import Game from './game'
import Util from './util'

class Renderer extends Component {
  constructor (gameObject) {
    super(gameObject)

    this._initShaderProgram()
  }

  // XXX: convention: vertex array always named vPosition
  _initShaderProgram (vertId = 'passthrough.vert', fragId = 'passthrough.frag') {
    const gl = Game.gl

    const vertInfo = AssetManager.getAsset('shader', vertId)
    const fragInfo = AssetManager.getAsset('shader', fragId)

    const vert = Renderer._loadShader(vertId)
    const frag = Renderer._loadShader(fragId)

    const program = gl.createProgram()
    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`unable to init the shader program: ${gl.getProgramInfoLog(program)}`)
    }
    this.shaderProgram = program

    gl.useProgram(program)

    // bind attribute location
    this.attributes = {}
    for (let props of [...(vertInfo.attributes || []), ...(fragInfo.attributes || [])]) {
      const attr = Util.clone(props)
      attr.location = gl.getAttribLocation(program, attr.name)
      attr.buffer = new Float32Array(0)
      attr.size = 2 // default to 2d

      gl.enableVertexAttribArray(attr.location)

      this.attributes[props.name] = attr
    }

    // bind uniform location
    this.uniforms = {}
    for (let props of [...(vertInfo.uniforms || []), ...(fragInfo.uniforms || [])]) {
      const uniform = Util.clone(props)
      uniform.location = gl.getUniformLocation(program, uniform.name)
      uniform.buffer = []
      uniform.size = 4 // default to fully specified vec4

      this.uniforms[props.name] = uniform
    }

    this.onShaderInitialized()
  }

  onShaderInitialized () {
    this.vPosition = this.attributes['vPosition']
  }

  static _loadShader (id) {
    const gl = Game.gl

    const shaderInfo = AssetManager.getAsset('shader', id)

    const shader = gl.createShader(gl[shaderInfo.type])

    gl.shaderSource(shader, shaderInfo.src)
    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const err = new Error(`an error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`)
      gl.deleteShader(shader)
      throw err
    }

    return shader
  }

  render () {
    const mesh = this.gameObject.getComponent(Mesh)
    if (!mesh) {
      // nothing to render
      this.attributes.vPosition.buffer = []
      return
    }

    const vPos = mesh.getVertexArrayBuffer()
    this.attributes.vPosition.buffer = vPos.buffer
    this.attributes.vPosition.size = vPos.size

    const gl = Game.gl
    gl.useProgram(this.shaderProgram)
    gl.bindBuffer(gl.ARRAY_BUFFER, Game.gl.vBuffer)

    // marshal buffers for attributes
    let pos = 0
    for (let key of Object.keys(this.attributes)) {
      const attr = this.attributes[key]
      attr._pos = pos
      pos += attr.buffer.length
    }

    let buffer = new Float32Array(pos)
    pos = 0
    for (let key of Object.keys(this.attributes)) {
      const attr = this.attributes[key]
      gl.vertexAttribPointer(attr.location, attr.size, gl.FLOAT, false, 0, pos)

      buffer.set(attr.buffer, pos)

      pos += attr.buffer.length
    }

    // set uniforms
    for (let key of Object.keys(this.uniforms)) {
      const uniform = this.uniforms[key]

      switch (uniform.size) {
        case 1:
          gl.uniform1fv(this.uniforms.fColor.location, this.uniforms.fColor.buffer)
          break
        case 2:
          gl.uniform2fv(this.uniforms.fColor.location, this.uniforms.fColor.buffer)
          break
        case 3:
          gl.uniform3fv(this.uniforms.fColor.location, this.uniforms.fColor.buffer)
          break
        case 4:
          gl.uniform4fv(this.uniforms.fColor.location, this.uniforms.fColor.buffer)
          break
        default:
          if (uniform.size > 4 || uniform < 1) {
            throw new Error(`invalid size for uniform ${uniform.name}: ${uniform.size}`)
          }
      }
    }

    gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW)

    this.onDrawCall()
  }

  onDrawCall () {
    const gl = Game.gl
    gl.drawArrays(gl.TRIANGLES, this.vPosition._pos,
      Math.floor(this.vPosition.buffer.length / this.vPosition.size))
  }
}

export default Renderer
