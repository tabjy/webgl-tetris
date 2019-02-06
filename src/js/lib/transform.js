import Component from './component'
import World from './world'

import { Vector2 } from './vectors'

class Transform extends Component {
  constructor (gameObject) {
    super(gameObject)

    this.parent = (gameObject.tag === 'world') ? null : World.getInstance().transform
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

    if (this.tag === 'world') {
      throw new Error('cannot set parent of "world"')
    }

    this.parent.children[this] = null // unset old parent
    parent.children[this] = this
    this.parent = parent

    // TODO: correct transform
  }

  detachChildren () {
    if (this.tag === 'world') {
      throw new Error('"world" cannot detach its children')
    }

    // grandparent adopts children
    for (let child of this.children) {
      child.setParent(this.parent)
    }
  }
}

export default Transform
