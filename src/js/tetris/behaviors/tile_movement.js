import { Behavior, Vector2, Game } from '../../runtime'
import GameLogic from './game_logic'

class TileMovement extends Behavior {
  onStart () {
    super.onStart()

    this.enabled = false

    this.rotations = this.gameObject.pattern.rotations
    this.rotationIdx = Math.floor(Math.random() * this.rotations.length)
    this.transform.rotation = this.rotations[this.rotationIdx]

    this.fallingVelocityMultiplier = 1
    this.previousFallingMode = TileMovement.fallingMode

    this.continousFallingAcc = 0
  }

  onUpdate () {
    super.onUpdate()

    let deltaTime = Game.deltaTime

    // compensate collision detection if FPS < 20
    if (deltaTime > 50) {
      deltaTime = 50
    }

    if (!this.enabled) {
      return
    }

    const fallingVelocity = TileMovement.defaultFallingVelocity.mul(this.fallingVelocityMultiplier)

    let translation = fallingVelocity.mul(deltaTime / 1000)

    if (TileMovement.fallingMode === TileMovement.FALLING_MODES.DISCRETE) {
      if (this.previousFallingMode === TileMovement.FALLING_MODES.CONTINUOUS) {
        this.transform.position.y = Math.floor(this.transform.position.y)
        if (this.gameObject.pattern.name === 'O-shape') {
          this.transform.position.y += 0.5
        }
      }

      this.continousFallingAcc += deltaTime

      const step = 1000 / Math.abs(fallingVelocity.y)
      if (this.continousFallingAcc >= step) {
        this.continousFallingAcc %= step
        translation = Vector2.down
      } else {
        return
      }
    }

    this.previousFallingMode = TileMovement.fallingMode

    if (this.detectCollision(translation)) {
      // this is why I hate js for only having floating point numbers
      const offset = this.gameObject.pattern.name === 'O-shape' ? new Vector2(-0.5, -0.5) : Vector2.zero
      this.transform.position.x = Math.round(this.transform.position.x)
      this.transform.position.y = Math.round(this.transform.position.y)
      this.transform.position.x += offset.x
      this.transform.position.y += offset.y

      this.enabled = false
      return
    }

    this.transform.translate(translation)
  }

  detectCollision (translation = Vector2.zero, dRotation = 0) {
    this.transform.translate(translation)
    this.transform.rotate(dRotation)

    let detected
    for (let square of this.gameObject.squares) {
      detected = true

      const relativeTransform = square.transform.toAncestorTransform(this.transform.parent)
      const stacked = this.transform.parent.gameObject.getComponent(GameLogic).stacked

      if (TileMovement.fallingMode === TileMovement.FALLING_MODES.DISCRETE) {
        const x = Math.round(relativeTransform.position.x)
        const y = Math.round(relativeTransform.position.y)

        if (y < 0 || y > 19) {
          break
        }

        if (x < 0 || x > 9) {
          break
        }

        if (stacked[y][x]) {
          break
        }
      } else {
        if (Math.floor(relativeTransform.position.y) < 0 || Math.ceil(relativeTransform.position.y) > 19) {
          break
        }

        if (Math.ceil(relativeTransform.position.x) < 0 || Math.floor(relativeTransform.position.x) > 9) {
          break
        }

        const x = Math.round(relativeTransform.position.x)
        const y1 = Math.ceil(relativeTransform.position.y)
        const y2 = Math.floor(relativeTransform.position.y)

        if (stacked[y1][x] || stacked[y2][x]) {
          break
        }
      }

      detected = false
    }

    this.transform.translate(translation.neg())
    this.transform.rotate(-dRotation)

    return detected
  }

  rotate () {
    if (!this.enabled) {
      return
    }

    const rotationIdx = (this.rotationIdx + 1) % this.rotations.length
    const rotation = this.rotations[rotationIdx]
    if (!this.detectCollision(Vector2.zero, rotation - this.transform.rotation)) {
      this.rotationIdx = rotationIdx
      this.transform.rotation = rotation
    }
  }

  moveLeft () {
    if (!this.enabled) {
      return
    }
    if (!this.detectCollision(Vector2.left)) {
      this.transform.translate(Vector2.left)
    }
  }

  moveRight () {
    if (!this.enabled) {
      return
    }
    if (!this.detectCollision(Vector2.right)) {
      this.transform.translate(Vector2.right)
    }
  }

  setFallingVelocityMultiplier (multiplier) {
    this.fallingVelocityMultiplier = multiplier
  }
}

TileMovement.FALLING_MODES = {
  CONTINUOUS: Symbol('TileMovement.FALLING_MODES.CONTINUOUS'),
  DISCRETE: Symbol('TileMovement.FALLING_MODES.DISCRETE')
}

TileMovement.defaultFallingVelocity = new Vector2(0, -2) // units per second
TileMovement.fallingMode = TileMovement.FALLING_MODES.DISCRETE

export default TileMovement
