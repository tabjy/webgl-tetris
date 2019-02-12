import { Behavior, Vector2 } from '../../runtime'
import FPSCounter from './fps_counter'
import Grid from '../game_objects/grid'
import GameObject from '../../runtime/game_object'
import GameLogic from './game_logic'
import TileMovement from './tile_movement'

class UI extends Behavior {
  onStart () {
    super.onStart()

    for (let key of Object.keys(this.transform.children)) {
      const child = this.transform.children[key]
      if (child.gameObject instanceof Grid) {
        this.grid = child.gameObject
        break
      }
    }

    this.fpsBehavior = this.gameObject.getComponent(FPSCounter)
    this.fpsOut = window.document.getElementById('fps')

    this.gameStateOut = window.document.getElementById('game_state')
    this.nextTileOut = window.document.getElementById('next_tile')
    this.currentScoreOut = window.document.getElementById('current_score')

    this.highestScore = 0
    this.highestScoreOut = window.document.getElementById('highest_score')

    this.fallingSpeedOut = window.document.getElementById('falling_speed')

    window.document.getElementById('falling_speed_in').oninput = (e) => {
      const speed = Number.parseInt(e.target.value) / 10
      this.fallingSpeedOut.innerText = speed
      TileMovement.defaultFallingVelocity = new Vector2(0, -speed)
    }

    window.document.getElementById('falling_mode_continuous').onclick = () => {
      TileMovement.fallingMode = TileMovement.FALLING_MODES.CONTINUOUS
    }
    window.document.getElementById('falling_mode_discrete').onclick = () => {
      TileMovement.fallingMode = TileMovement.FALLING_MODES.DISCRETE
    }

    window.document.getElementById('start_game').onclick = () => {
      this.startGame()
    }

    window.document.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'q':
          this.quitGame()
          break
        case 'r':
          this.startGame()
          break
      }
    })
  }

  startGame () {
    if (this.gameRoot) {
      this.gameRoot.transform.setParent(null)
    }

    const root = new GameObject()
    root.transform.translate(new Vector2(0.5, 0.5))
    root.addComponent(GameLogic)
    root.transform.setParent(this.grid.transform)
    root.getComponent(GameLogic).startGame()

    this.gameRoot = root
  }

  quitGame () {
    if (this.gameRoot) {
      this.gameRoot.transform.setParent(null)
    }

    this.gameRoot = null
  }

  // DOM operation is expensive, output when onFixedUpdate
  // avoid blocking rendering
  onFixedUpdate () {
    super.onFixedUpdate()

    this.fpsOut.innerText = this.fpsBehavior.value

    if (this.gameRoot) {
      const gameLogic = this.gameRoot.getComponent(GameLogic)
      const score = Math.round(gameLogic.score)

      this.gameStateOut.innerText = gameLogic.state.description
      this.nextTileOut.innerText = gameLogic.nextTile ? gameLogic.nextTile.pattern.name : 'unknown'
      this.currentScoreOut.innerText = String(score)

      if (Math.round(gameLogic.score) > this.highestScore) {
        this.highestScore = score
      }
    } else {
      this.gameStateOut.innerText = 'unknown'
      this.nextTileOut.innerText = 'unknown'
      this.currentScoreOut.innerText = 'unknown'
    }

    this.highestScoreOut.innerText = this.highestScore
  }
}

export default UI
