import World from './world'

class Game {
  static init (canvasElem) {
    this.deltaTime = 0

    if (!window.WebGLRenderingContext) {
      throw new Error('this browser does not support WebGL')
    }

    const gl = canvasElem.getContext('webgl')
    if (!gl) {
      throw new Error('failed to get WebGL context')
    }

    Game.vBuffer = gl.createBuffer()

    Game.gl = gl

    Game.world = World.getInstance()
  }
}

export default Game
