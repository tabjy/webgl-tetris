import Component from './component'
import { Vector2 } from './vectors'

class Mesh extends Component {
  constructor (gameObject) {
    super(gameObject)

    this.vertices = [
      new Vector2(-0.25, -0.25),
      new Vector2(0, 0.25),
      new Vector2(0.25, -0.25)
    ] // Vector2 array

    this.colors = [] // Color array
    this.faces = [0, 1, 2] // number array indexing this.vertices
    // this.faceSize = 3 // default to triangle
  }

  // as in WebGL clip coordinates
  getVertexArrayBuffer () {
    // TODO: calculate vertices from transform
    let buffer = []
    for (let vertIdx of this.faces) {
      buffer = [...buffer, ...this.vertices[vertIdx].flatten()]
    }

    return new Float32Array(buffer)
  }
}

export default Mesh
