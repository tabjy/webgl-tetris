import Component from './component'

class Mesh extends Component {
  constructor (gameObject) {
    super(gameObject)

    this.vertices = [] // Vector2 array
    this.colors = [] // Color array
    this.faces = [] // number array indexing this.vertices
  }
}

export default Mesh
