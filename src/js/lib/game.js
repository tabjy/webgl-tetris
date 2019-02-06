class Game {
  static init (canvasElem) {
    this.gameObjects = {} // hash map instead of list
    this.deltaTime = 0

    if (!window.WebGLRenderingContext) {
      throw new Error('this browser does not support WebGL')
    }

    Game.gl = canvasElem.getContext('webgl')
    if (!Game.gl) {
      throw new Error('failed to get WebGL context')
    }

    // TODO: init world
  }
}

export default Game
