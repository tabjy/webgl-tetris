import Game from './game'

class AssetManager {
  static init (manifest) {
    AssetManager.eventHandlers = {}
    AssetManager.promises = []
    AssetManager.assets = {
      shader: {}
      // TODO: support other resource type
    }

    AssetManager.manifest = manifest
  }

  static on (eventName, handler) {
    // progress, load, error, abort
    AssetManager.eventHandlers[eventName] = AssetManager.eventHandlers[eventName] || []
    AssetManager.eventHandlers[eventName].push(handler)
  }

  static _dispatch (eventName, ...args) {
    if (!AssetManager.eventHandlers[eventName]) {
      return
    }

    for (let handler of AssetManager.eventHandlers[eventName]) {
      handler(...args)
    }
  }

  static fetch () {
    const shaders = AssetManager.manifest['shaders'] || []
    for (let shader of shaders) {
      AssetManager.promises.push(window.fetch(shader.url).then((res) => {
        return res.text()
      }).then((src) => {
        shader = { ...shader, src }
        AssetManager.assets.shader[shader.id] = shader
        AssetManager._dispatch('progress', shader)

        return Promise.resolve()
      }).catch((err) => AssetManager._dispatch('error', err)))
    }

    // TODO: support other resource type

    Promise.all(AssetManager.promises).then(() => AssetManager._dispatch('load'))
  }

  static abort () {
    throw new Error('abort() not yet implemented')
  }

  static getAsset (type, id) {
    const typeCollection = AssetManager.assets[type]
    const asset = (typeCollection || {})[id]
    if (!asset) {
      throw new Error(`${type}: '${id}', is either not registered or not yet downloaded`)
    }

    return asset
  }

  static getShader (id) {
    const shaderInfo = AssetManager.getAsset('shader', id)

    const shader = Game.gl.createShader(Game.gl[shaderInfo.type])

    Game.gl.shaderSource(shader, shaderInfo.src)
    Game.gl.compileShader(shader)

    if (!Game.gl.getShaderParameter(shader, Game.gl.COMPILE_STATUS)) {
      const err = new Error(`an error occurred compiling the shaders: ${Game.gl.getShaderInfoLog(shader)}`)
      Game.gl.deleteShader(shader)
      throw err
    }

    return shader
  }

  static getShaderProgram (vertId, fragId) {
    const vert = AssetManager.getShader(vertId)
    const frag = AssetManager.getShader(fragId)

    const program = Game.gl.createProgram()
    Game.gl.attachShader(program, vert)
    Game.gl.attachShader(program, frag)
    Game.gl.linkProgram(program)

    if (!Game.gl.getProgramParameter(program, Game.gl.LINK_STATUS)) {
      throw new Error(`unable to init the shader program: ${Game.gl.getProgramInfoLog(program)}`)
    }

    // TODO: bind variables

    return program
  }
}

export default AssetManager
