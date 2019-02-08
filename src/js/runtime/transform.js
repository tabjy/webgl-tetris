import Component from './component'
import Game from './game'
import World from './world'

import { Vector2 } from './vectors'

class Transform extends Component {
  constructor (gameObject) {
    super(gameObject)

    this.parent = (gameObject.tag === World.name) ? null : Game.world.transform
    this.children = {}

    // relative to parent
    this.position = Vector2.zero
    this.scaling = Vector2.one

    this.rotation = 0.0 // around origin, in radian
  }

  translate (dVec2) {
    this.position.add(dVec2)
  }

  scale (dVec2) {
    this.scaling.mul(dVec2)
  }

  rotate (dTheta) {
    this.rotation += dTheta
  }

  setParent (parent) {
    if (!parent) {
      throw new Error('parent cannot be null')
    }

    if (this.tag === World.name) {
      throw new Error('cannot set parent of "world"')
    }

    // BUG: using simple class name could result name clashes
    this.parent.children[this.name] = null // detach from old parent
    parent.children[this.name] = this
    this.parent = parent

    // TODO: correct transform relative to parent
  }

  detachChildren () {
    if (this.tag === World.name) {
      throw new Error('"world" cannot detach its children')
    }

    // grandparent adopts children
    for (let key of Object.keys(this.children)) {
      this.children[key].setParent(this.parent)
    }
  }
}

export default Transform
