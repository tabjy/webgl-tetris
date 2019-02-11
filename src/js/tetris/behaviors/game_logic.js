import { Behavior, Vector2 } from '../../runtime'
import Tile from '../game_objects/Tile'
import TileMovement from './tile_movement'

class GameLogic extends Behavior {
  onStart () {
    super.onStart()

    this.activeTile = null
    this.nextTile = null

    this.stacked = []
    for (let i = 0; i < 20; i++) {
      this.stacked[i] = []
      for (let ii = 0; ii < 10; ii++) {
        this.stacked[i][ii] = null
      }
    }

    setTimeout(() => {
      this.activeTile = this.spawnTile()
    }, 2000)

    window.addEventListener('keydown', (e) => {
      if (!this.activeTile) {
        return
      }

      switch (e.key) {
        case 'ArrowLeft':
          this.activeTile.getComponent(TileMovement).moveLeft()
          break
        case 'ArrowRight':
          this.activeTile.getComponent(TileMovement).moveRight()
          break
        case 'ArrowUp':
          this.activeTile.getComponent(TileMovement).rotate()
          break
        case 'ArrowDown':
          this.activeTile.getComponent(TileMovement).setFallingVelocity(TileMovement.defaultFallingVelocity.mul(5))
      }
    })

    window.addEventListener('keyup', (e) => {
      if (!this.activeTile) {
        return
      }

      switch (e.key) {
        case 'ArrowDown':
          this.activeTile.getComponent(TileMovement).setFallingVelocity(TileMovement.defaultFallingVelocity)
          break
      }
    })
  }

  onUpdate () {
    super.onUpdate()

    if (!this.activeTile) {
      return
    }

    if (this.activeTile.getComponent(TileMovement).stacked) {
      this.stackTile(this.activeTile)
      this.activeTile = null

      this.testElimination()

      setTimeout(() => {
        this.activeTile = this.spawnTile()
      }, 2000)
    }
  }

  spawnTile () {
    const tile = new Tile()
    tile.transform.setParent(this.transform)
    tile.transform.position = (new Vector2(5, 18)).add(tile.spawnOffset)

    if (tile.getComponent(TileMovement).detectCollision()) {
      document.write('game over. refresh to play again<br />')
      // TODO: stop main loop
    }

    return tile
  }

  stackTile (tile) {
    for (let square of tile.squares) {
      const relativeTransform = square.transform.toAncestorTransform(this.transform)

      const x = Math.round(relativeTransform.position.x)
      const y = Math.round(relativeTransform.position.y)

      this.stacked[y][x] = square

      square.transform.position.x = x
      square.transform.position.y = y
      square.transform.setParent(this.transform)
    }

    tile.transform.setParent(null)
  }

  testElimination () {
    for (let i = 0; i < 20; i++) {
      let eliminate = false
      for (let ii = 0; ii < 10; ii++) {
        if (!this.stacked[i][ii]) {
          break
        }

        if (ii === 9) {
          eliminate = true
        }
      }

      if (eliminate) {
        for (let ii = 0; ii < 10; ii++) {
          this.stacked[i][ii].transform.setParent(null)
        }
        this.stacked[i] = null
      }
    }

    // falling down
    let dstRow = 0
    for (let i = 0; i < 20; i++) {
      if (this.stacked[i] == null) {
        continue
      }

      for (let ii = 0; ii < 10; ii++) {
        if (this.stacked[i][ii]) {
          this.stacked[i][ii].transform.position.y = dstRow
        }
      }
      this.stacked[dstRow++] = this.stacked[i]
    }

    for (let i = dstRow; i < 20; i++) {
      this.stacked[i] = []
      for (let ii = 0; ii < 10; ii++) {
        this.stacked[i][ii] = null
      }

    }
  }
}

GameLogic.fallingSpeed = new Vector2(0, -1) // unit per second

export default GameLogic
