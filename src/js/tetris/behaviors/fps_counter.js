import { Behavior, Game } from '../../runtime'

class FPSCounter extends Behavior {
  onStart () {
    super.onStart()

    this.output = window.document.getElementById('fps')
    this.fps = 0
  }

  onUpdate () {
    super.onUpdate()

    // DOM operation is expensive, output when onFixedUpdate
    // avoid blocking rendering
    this.fps = Math.round(1000 / Game.deltaTime)
  }

  onFixedUpdate () {
    super.onFixedUpdate()

    this.output.innerText = this.fps
  }
}

export default FPSCounter
