import { Game, AssetManager, Vector2, Color } from '../runtime'

import Grid from './game_objects/grid'

import manifest from '../manifest'
import FPSCounter from './behaviors/fps_counter'
import UI from './behaviors/ui'

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
  Game.clearColor(Color.black)

  const grid = new Grid()
  grid.setDimension(20, 10)
  grid.transform.translate(new Vector2(-8, -10))
  grid.transform.setParent(Game.world.transform)

  Game.world.transform.scale(new Vector2(1 / 11, 1 / 11))
  Game.world.addComponent(FPSCounter)
  Game.world.addComponent(UI)

  Game.start()
}

export default {
  start
}
