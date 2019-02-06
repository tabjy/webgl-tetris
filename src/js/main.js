import '../styles/main.scss'

import Game from './lib/game'
import AssetManager from './lib/asset_manager'

import manifest from './manifest'

function init () {
  const canvas = document.querySelector('#canvas')

  Game.init(canvas)

  AssetManager.init(manifest)
  AssetManager.on('err', console.error)
  AssetManager.on('progress', (shaderInfo) => {
    console.log(`shader '${shaderInfo.id}' downloaded`)
  })
  AssetManager.on('load', () => {
    console.log('all assets downloaded')
    main()
  })

  console.log('preloading assets')
  AssetManager.fetch()
}

function main () {

}

init()
