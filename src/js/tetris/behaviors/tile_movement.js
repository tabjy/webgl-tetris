import { Behavior, Vector2 } from '../../runtime'
import GameLogic from './game_logic'

class TileMovement extends Behavior {
  onStart () {
    super.onStart()

    this.stacked = false

    this.rotations = this.gameObject.pattern.rotations
    this.rotationIdx = Math.floor(Math.random() * this.rotations.length)
    this.transform.rotation = this.rotations[this.rotationIdx]

    this.fallingVelocity = TileMovement.defaultFallingVelocity.mul(1)
  }

  onUpdate () {
    super.onUpdate()

    if (this.stacked) {
      return
    }

    if (this.detectCollision(this.fallingVelocity.mul(Game.deltaTime / 1000))) {
      // this is why I hate js for only having floating point numbers
      const offset = this.gameObject.pattern.name === 'O-shape' ? new Vector2(-0.5, -0.5) : Vector2.zero
      this.transform.position.x = Math.round(this.transform.position.x)
      this.transform.position.y = Math.round(this.transform.position.y)
      this.transform.position.x += offset.x
      this.transform.position.y += offset.y

      this.stacked = true
      return
    }

    this.transform.translate(this.fallingVelocity.mul(Game.deltaTime / 1000))
  }

  detectCollision (translation = Vector2.zero, dRotation = 0) {
    this.transform.translate(translation)
    this.transform.rotate(dRotation)

    let detected
    for (let square of this.gameObject.squares) {
      detected = true

      const relativeTransform = square.transform.toAncestorTransform(this.transform.parent)

      if (Math.floor(relativeTransform.position.y) < 0 || Math.ceil(relativeTransform.position.y) > 19) {
        break
      }

      if (Math.ceil(relativeTransform.position.x) < 0 || Math.floor(relativeTransform.position.x) > 9) {
        break
      }

      // TODO: check stacked squares

      const x = Math.round(relativeTransform.position.x)
      const y1 = Math.ceil(relativeTransform.position.y)
      const y2 = Math.floor(relativeTransform.position.y)

      const stacked = this.transform.parent.gameObject.getComponent(GameLogic).stacked
      if (stacked[y1][x] || stacked[y2][x]) {
        break
      }

      detected = false
    }

    this.transform.translate(translation.neg())
    this.transform.rotate(-dRotation)

    // DEBUG
    if (detected) {
      console.log(`collision detected at ${this.transform.position}`)
      for (let square of this.gameObject.squares) {
        const relativeTransform = square.transform.toAncestorTransform(this.transform.parent)
        console.log(relativeTransform)
      }

    }

    return detected
  }

  rotate () {
    if (this.stacked) {
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
    if (this.stacked) {
      return
    }
    if (!this.detectCollision(Vector2.left)) {
      this.transform.translate(Vector2.left)
    }
  }

  moveRight () {
    if (this.stacked) {
      return
    }
    if (!this.detectCollision(Vector2.right)) {
      this.transform.translate(Vector2.right)
    }
  }

  setFallingVelocity (velocity) {
    this.fallingVelocity = velocity
  }
}

// units per second
TileMovement.defaultFallingVelocity = new Vector2(0, -2)

export default TileMovement
