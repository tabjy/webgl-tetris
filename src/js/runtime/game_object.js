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
    this._tag = tag || this.__proto__.constructor.name
    this._name = name || this._tag + '#' + Date.now().toString(36) +
      Math.random().toString(36).substr(2, 5)

    this.components = {}

    this.addComponent(Transform)
  }

  addComponent (componentClass, implementationClass) {
    // BUG: using simple class name could result name clashes
    if (this.components[componentClass.name]) {
      throw new Error(`a(n) ${componentClass.name} is already attached to ${this.tag}`)
    }

    this.components[componentClass.name] = new (implementationClass || componentClass)(this)
  }

  // XXX: possible to return a null pointer
  getComponent (componentClass) {
    return this.components[componentClass.name]
  }
}

export default GameObject
