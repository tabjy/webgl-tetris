import Component from './component'
import Game from './game'

import { Vector2 } from './vectors'

class Transform extends Component {
  constructor (gameObject) {
    super(gameObject)

    // TODO: avoid hard code
    // this.parent = (gameObject.tag === 'World') ? null : Game.world.transform
    this.parent = null // default not to be added to GameObject tree, not rendering
    this.children = {}

    // relative to parent
    this.position = new Vector2(0, 0)
    this.scaling = new Vector2(1, 1)

    this.rotation = 0.0 // around origin, in radian
  }

  translate (dVec2) {
    this.position = this.position.add(dVec2)
  }

  scale (dVec2) {
    this.scaling = this.scaling.mul(dVec2)
  }

  rotate (dTheta) {
    this.rotation += dTheta
  }

  // a copy of `this' relative directly to Game.world
  toWorldTransform () {
    const ret = new Transform()
    ret.gameObject = this.gameObject
    if (this === Game.world.transform) {
      ret.position = new Vector2(0, 0)
      ret.scaling = new Vector2(1, 1)
      ret.rotation = 0
      return ret
    }

    if (!this.parent) {
      throw new Error(`${this.name} is not attached to Game.world`)
    }

    ret.position = this.position.mul(1) // create a copy
    ret.scaling = this.scaling.mul(1)
    ret.rotation = this.rotation
    if (this.parent === Game.world.transform) {
      return ret
    }

    const parentWorldTransform = this.parent.toWorldTransform()

    ret.position.x = ret.position.x * Math.cos(this.rotation) + ret.position.y *
      Math.sin(this.rotation)
    ret.position.y = ret.position.x * -Math.sin(this.rotation) + ret.position.y *
      Math.cos(this.rotation)

    ret.position.x = parentWorldTransform.scaling.x * ret.position.x
    ret.position.y = parentWorldTransform.scaling.y * ret.position.y

    ret.scaling = ret.scaling.mul(parentWorldTransform.scaling)

    ret.rotation += parentWorldTransform.rotation
    return ret
  }

  setParent (parent) {
    if (this === Game.world) {
      throw new Error('cannot set parent of "world"')
    }

    if (this.parent) {
      delete this.parent.children[this.name] // detach from old parent
    }

    if (parent) {
      parent.children[this.name] = this
    }

    this.parent = parent
  }

  detachChildren () {
    if (this === Game.world) {
      throw new Error('"world" cannot detach its children')
    }

    // grandparent adopts children
    for (let key of Object.keys(this.children)) {
      this.children[key].setParent(this.parent)
    }
  }
}

export default Transform
