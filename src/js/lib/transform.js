import { Vector2 } from './vectors'

class Transform {
  constructor () {
    this.parent = null // null -> clip coordinate

    // relative to parent
    this.position = Vector2.zero
    this.scaling = Vector2.one

    this.rotation = 0.0 // around origin, in radian
  }

  translate (dVec2) {
    this.rotation.add(dVec2)
  }

  scale (dVec2) {
    this.scaling.mul(dVec2)
  }

  rotate (dTheta) {
    this.rotation += dTheta
  }

}

export default Transform
