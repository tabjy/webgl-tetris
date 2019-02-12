import { Behavior, GameObject, Vector2, Game } from '../../runtime'
import Tile from '../game_objects/Tile'
import TileMovement from './tile_movement'

class GameLogic extends Behavior {
  startGame () {
    this.activeTile = null
    this.nextTile = null
    this.state = GameLogic.STATES.READY

    this.stacked = []
    for (let i = 0; i < 20; i++) {
      this.stacked[i] = []
      for (let ii = 0; ii < 10; ii++) {
        this.stacked[i][ii] = null
      }
    }

    this.spawnTile()

    this.state = GameLogic.STATES.PLAYING
  }

  onStart () {
    super.onStart()

    this.nextTileDisplay = new GameObject()
    this.nextTileDisplay.transform.setParent(this.transform)
    this.nextTileDisplay.transform.position = (new Vector2(14, 10))

    this.state = GameLogic.STATES.READY
    this.score = 0

    Game.canvas.addEventListener('keydown', (e) => {
      if (this.state !== GameLogic.STATES.PLAYING) {
        return
      }

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
          this.activeTile.getComponent(TileMovement).setFallingVelocityMultiplier(5)
      }

      e.preventDefault()
    })

    Game.canvas.addEventListener('keyup', (e) => {
      if (this.state !== GameLogic.STATES.PLAYING) {
        return
      }

      if (!this.activeTile) {
        return
      }

      switch (e.key) {
        case 'ArrowDown':
          this.activeTile.getComponent(TileMovement).setFallingVelocityMultiplier(1)
          break
      }

      e.preventDefault()
    })
  }

  onUpdate () {
    super.onUpdate()

    if (this.state !== GameLogic.STATES.PLAYING) {
      return
    }

    if (!this.activeTile) {
      return
    }

    if (!this.activeTile.getComponent(TileMovement).enabled) {
      this.stackTile(this.activeTile)
      this.activeTile = null

      this.testElimination()

      setTimeout(() => {
        this.spawnTile()
      }, 2000)
    }
  }

  spawnTile () {
    if (!this.nextTile) {
      this.nextTile = new Tile()
    }

    this.activeTile = this.nextTile
    this.activeTile.transform.setParent(this.transform)
    this.activeTile.transform.position = (new Vector2(5, 18)).add(this.activeTile.spawnOffset)
    this.activeTile.getComponent(TileMovement).enabled = true

    this.nextTile = new Tile()
    this.nextTile.transform.setParent(this.nextTileDisplay.transform)
    this.nextTile.transform.translate(this.nextTile.spawnOffset)

    if (this.activeTile.getComponent(TileMovement).detectCollision()) {
      this.state = GameLogic.STATES.GAME_OVER
    }
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

    this.score += tile.squares.length * 5

    tile.transform.setParent(null)
  }

  testElimination () {
    let rowEliminated = 0

    for (let i = 0; i < 20; i++) {
      let eliminate = false
      for (let ii = 0; ii < 10; ii++) {
        if (!this.stacked[i][ii]) {
          break
        }

        if (ii === 9) {
          eliminate = true
          rowEliminated++
        }
      }

      if (eliminate) {
        for (let ii = 0; ii < 10; ii++) {
          this.stacked[i][ii].transform.setParent(null)
        }
        this.stacked[i] = null
      }
    }

    if (rowEliminated > 0) {
      this.score += 10 * 5 * 2 ** (rowEliminated - 1)
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

GameLogic.STATES = {
  READY: Symbol('GameLogic.STATES.READY'),
  PLAYING: Symbol('GameLogic.STATES.PLAYING'),
  GAME_OVER: Symbol('GameLogic.STATES.GAME_OVER'),
  PAUSED: Symbol('GameLogic.STATES.PAUSED')
}

export default GameLogic
