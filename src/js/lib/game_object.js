import Transform from './transform'

class GameObject {
  get tag () {
    return this._tag
  }

  get name () {
    return this._name
  }

  get transform () {
    return this.getComponent(Transform)
  }

  constructor (tag, name) {
    this._tag = tag
    this._name = name || this.__proto__.constructor.name + '#' + Date.now().toString(36) +
      Math.random().toString(36).substr(2, 5)

    this.components = {}

    this.addComponent(Transform)
  }

  addComponent (componentClass) {
    if (this.components[componentClass]) {
      throw new Error(`${componentClass.name} is already attached to ${this.tag}`)
    }

    this.components[componentClass] = new componentClass(this)
  }

  // XXX: possible to return a null pointer
  getComponent (componentClass) {
    return this.components[componentClass]
  }
}

export default GameObject
