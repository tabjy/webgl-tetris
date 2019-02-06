class Component {
  get tag () {
    return this.gameObject.tag
  }

  get name () {
    return this.gameObject.name
  }

  get transform () {
    return this.gameObject.transform
  }

  constructor (gameObject) {
    this.gameObject = gameObject // the GameObject this component is attached to
  }
}

export default Component
