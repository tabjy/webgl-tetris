import Transform from './transform'
import Behavior from './behavior'

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

  addComponent (ImplementationClass) {
    // BUG: possible name clash
    if (this.components[ImplementationClass.name]) {
      throw new Error(`a(n) ${ImplementationClass.name} is already attached to ${this.tag}`)
    }

    const component = new ImplementationClass(this)

    if (component instanceof Behavior) {
      component.onStart()
    }

    this.components[ImplementationClass.name] = component
  }

  // return (any) one component of this class or its subclasses
  // XXX: possible to return a null pointer
  getComponent (InterfaceClass) {
    for (let key of Object.keys(this.components)) {
      if (this.components[key] instanceof InterfaceClass) {
        return this.components[key]
      }
    }
    return null
  }

  // return a list of component of this class or its subclasses
  getComponents (InterfaceClass) {
    const ret = []
    for (let key of Object.keys(this.components)) {
      if (!InterfaceClass || this.components[key] instanceof InterfaceClass) {
        ret.push(this.components[key])
      }
    }
    return ret
  }

  _iterateGameObject (callback) {
    for (let key of Object.keys(this.transform.children)) {
      callback(this.transform.children[key].gameObject)
    }
  }
}

export default GameObject
