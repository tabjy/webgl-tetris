import { Game, AssetManager, Color, Vector2 } from '../runtime'

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
}

export default {
  start
}
