import { Game, AssetManager, Renderer } from '../runtime'

import Square from './game_objects/square'

import manifest from '../manifest'
import FPSCounter from './behaviors/fps_counter'

let canvas

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

  const square = new Square()
  square.transform.setParent(Game.world.transform)
  square.getComponent(Renderer).debug(1)

  const square2 = new Square()
  square2.transform.setParent(Game.world.transform)
  square2.getComponent(Renderer).debug(0)
}

export default {
  start
}
