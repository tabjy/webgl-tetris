import { Game, AssetManager, Vector2, Color } from '../runtime'

import Grid from './game_objects/grid'

import manifest from '../manifest'
import FPSCounter from './behaviors/fps_counter'
import GameLogic from './behaviors/game_logic'
import GameObject from '../runtime/game_object'

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

  // DEBUG: expose the entire state tree for debugging
  window.Game = Game

  Game.world.addComponent(FPSCounter)

  const grid = new Grid()
  grid.setDimension(20, 10)
  grid.transform.translate(new Vector2(-5, -10))
  grid.transform.setParent(Game.world.transform)

  const root = new GameObject()
  root.transform.translate(new Vector2(0.5, 0.5))
  root.addComponent(GameLogic)
  root.transform.setParent(grid.transform)

  Game.world.transform.scale(new Vector2(1 / 11, 1 / 11))
}

export default {
  start
}
