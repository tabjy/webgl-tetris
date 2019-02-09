import { Game, AssetManager, Color, Vector2, GameObject, Renderer, Mesh, Behavior } from '../runtime'

import manifest from '../manifest'
import FPSCounter from './behaviors/fps_counter'

let canvas

class Square extends GameObject {
  constructor () {
    super()

    this.addComponent(Renderer)
    this.addComponent(Mesh)

    this.addComponent(Animator)
  }

  setColor (color) {
    const renderer = this.getComponent(Renderer)
    renderer.uniforms.fColor.buffer = color.flatten()
  }
}

class Animator extends Behavior {
  setRotation (degreePerSecond) {
    this.rotation = Math.PI / 180 * degreePerSecond / 1000
  }

  setZoomAnimation (enabled, baseScaling) {
    this.zoomEnabled = enabled
    this.zoom = 0
    this.baseScaling = baseScaling
  }

  onStart () {
    super.onStart()
    this.setRotation(0)
  }

  onUpdate () {
    super.onFixedUpdate()

    this.transform.rotate(this.rotation * Game.deltaTime)

    if (this.zoomEnabled) {
      this.zoom += 0.01
      this.transform.scaling = this.baseScaling.mul(Math.sin(this.zoom))
      // this.transform.scaling.x = oldTransform.mul(Math.sin(this.zoom))
      // this.transform.scaling.y = Math.sin(this.zoom)
    }
  }
}

function start (canvasElem) {
  canvas = canvasElem

  AssetManager.init(manifest)
  AssetManager.on('err', console.error)
  AssetManager.on('progress', (shaderInfo) => {
    console.log(`shader '${shaderInfo.id}' loaded`)
  })
  AssetManager.on('load', () => {
    console.log('all assets loaded')
    main()
  })

  console.log('loading assets')
  AssetManager.fetch()
}

function main () {
  Game.init(canvas)

  // DEBUG: expose the entire state tree for debugging
  window.Game = Game

  window.Game.world.addComponent(FPSCounter)

  const background = new Square()
  background.setColor(Color.black)
  background.transform.scale(new Vector2(2, 2))
  background.getComponent(Animator).setZoomAnimation(true, background.transform.scaling)
  background.getComponent(Animator).setRotation(45)

  const square = new Square()
  square.setColor(Color.red)
  square.transform.scale(new Vector2(0.5, 0.5))
  square.transform.translate(new Vector2(0.25, 0.25))
  square.getComponent(Animator).setRotation(-45)

  const square2 = new Square()
  square2.setColor(Color.blue)
  square2.transform.scale(new Vector2(0.5, 0.5))
  square2.transform.translate(new Vector2(-0.25, -0.25))
  square2.getComponent(Animator).setRotation(45)

  const square3 = new Square()
  square3.setColor(Color.green)
  square3.transform.scale(new Vector2(0.5, 0.5))
  square3.transform.translate(new Vector2(0.25, -0.25))
  square3.getComponent(Animator).setRotation(0)

  const square4 = new Square()
  square4.setColor(Color.magenta)
  square4.transform.scale(new Vector2(0.5, 0.5))
  square4.transform.translate(new Vector2(-0.25, 0.25))
  square4.getComponent(Animator).setRotation(-90)

  const square5 = new Square()
  square5.setColor(Color.yellow)
  square5.transform.scale(new Vector2(0.5, 0.5))
  square5.getComponent(Animator).setRotation(-45)
  square5.getComponent(Animator).setZoomAnimation(true, square.transform.scaling)

  square.transform.setParent(background.transform)
  square2.transform.setParent(background.transform)
  square3.transform.setParent(background.transform)
  square4.transform.setParent(background.transform)
  square5.transform.setParent(background.transform)
  background.transform.setParent(Game.world.transform)
}

export default {
  start
}
