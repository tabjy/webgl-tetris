import { Behavior, Vector2 } from '../../runtime'
import Square from '../game_objects/square'
import Tile from '../game_objects/Tile'

class GameLogic extends Behavior {
  onStart () {
    super.onStart()

    this.grid = this.gameObject

    this.activeTile = this.spawnTile()

    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.activeTile.transform.translate(new Vector2(-1, 0))
          break
        case 'ArrowRight':
          this.activeTile.transform.translate(new Vector2(1, 0))
          break
        case 'ArrowUp':
          this.activeTile.rotate()
          break
      }
    })
  }

  spawnTile () {
    const tile = new Tile()
    tile.transform.setParent(this.grid.transform)
    tile.transform.position = (new Vector2(5, 18)).add(tile.spawnOffset)
    window.tile = tile
    return tile
  }
}

export default GameLogic
