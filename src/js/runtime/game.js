import World from './world'

class Game {
  static init (canvasElem) {
    this.deltaTime = 0

    if (!window.WebGLRenderingContext) {
      throw new Error('this browser does not support WebGL')
    }

    Game.gl = canvasElem.getContext('webgl')
    if (!Game.gl) {
      throw new Error('failed to get WebGL context')
    }

    Game.world = World.getInstance()
  }
}

export default Game
