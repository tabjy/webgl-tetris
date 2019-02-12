import { Behavior, Game } from '../../runtime'

class FPSCounter extends Behavior {
  onStart () {
    super.onStart()

    this.value = 0
  }

  onFixedUpdate () {
    super.onFixedUpdate()

    this.value = Math.round(1000 / Game.deltaTime)
  }
}

export default FPSCounter
