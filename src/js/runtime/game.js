import Behavior from './behavior'
import Renderer from './renderer'
import GameObject from './game_object'

class Game {
  static init (canvasElem) {
    Game._lastFrameTime = null
    Game.deltaTime = 0

    if (!window.WebGLRenderingContext) {
      throw new Error('this browser does not support WebGL')
    }

    const gl = canvasElem.getContext('webgl')
    if (!gl) {
      throw new Error('failed to get WebGL context')
    }

    Game.gl = gl
    Game.gl.vBuffer = gl.createBuffer()

    Game.world = new GameObject('World')

    setInterval(Game.onFixedUpdateHandler, 1000 / Game.FIXED_UPDATE_RATE)

    const animationFrameCallback = () => {
      Game.onUpdateHandler()
      Game.onRenderHandler()
      Game.onLateUpdateHandler()

      window.requestAnimationFrame(animationFrameCallback)
      // setTimeout(animationFrameCallback, 0)
    }
    // TODO: polyfill for old browsers
    window.requestAnimationFrame(animationFrameCallback)
    // setTimeout(animationFrameCallback, 0)
  }

  static onUpdateHandler () {
    const now = new Date()
    if (!Game._lastFrameTime) {
      Game._lastFrameTime = now
      Game.deltaTime = 0
    } else {
      Game.deltaTime = now - Game._lastFrameTime
    }

    const callback = (gameObject) => {
      for (let behavior of gameObject.getComponents(Behavior)) {
        behavior.onUpdate()
      }

      gameObject._iterateGameObject(callback)
    }
    callback(Game.world)

    Game._lastFrameTime = now
  }

  static onRenderHandler () {
    Game.gl.clear(Game.gl.COLOR_BUFFER_BIT)

    const callback = (gameObject) => {
      for (let renderer of gameObject.getComponents(Renderer)) {
        renderer.render()
      }

      gameObject._iterateGameObject(callback)
    }
    callback(Game.world)
  }

  static onLateUpdateHandler () {
    const callback = (gameObject) => {
      for (let behavior of gameObject.getComponents(Behavior)) {
        behavior.onLateUpdate()
      }

      gameObject._iterateGameObject(callback)
    }
    callback(Game.world)
  }

  static onFixedUpdateHandler () {
    const callback = (gameObject) => {
      for (let behavior of gameObject.getComponents(Behavior)) {
        behavior.onFixedUpdate()
      }

      gameObject._iterateGameObject(callback)
    }
    callback(Game.world)
  }
}

// default settings
Game.FIXED_UPDATE_RATE = 60 // default to 60Hz

export default Game
