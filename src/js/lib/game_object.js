import GameBehavior from './game_behavior'
import Mesh from './mesh'
import Transform from './transform'

class GameObject extends GameBehavior {
  constructor () {
    super()
    this.transform = new Transform()
    this.mesh = new Mesh()
  }
}

export default GameObject
