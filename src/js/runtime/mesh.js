import Component from './component'
import { Vector2 } from './vectors'

class Mesh extends Component {
  constructor (gameObject) {
    super(gameObject)

    this.vertices = [
      new Vector2(-0.25, -0.25),
      new Vector2(-0.25, 0.25),
      new Vector2(0.25, 0.25),
      new Vector2(0.25, -0.25)
    ] // Vector2 array

    this.colors = [] // Color array
    this.faces = [0, 1, 2, 2, 0, 3] // number array indexing this.vertices
    // this.faceSize = 3 // default to triangle
  }

  // as in WebGL clip coordinates
  getVertexArrayBuffer () {
    const transformed = []

    const localTransform = this.gameObject.transform
    const worldTransform = localTransform.toWorldTransform()

    for (let vertex of this.vertices) {
      let x = vertex.x * Math.cos(worldTransform.rotation) - vertex.y * Math.sin(worldTransform.rotation)
      let y = vertex.x * Math.sin(worldTransform.rotation) + vertex.y * Math.cos(worldTransform.rotation)

      x *= worldTransform.scaling.x
      y *= worldTransform.scaling.y

      x += worldTransform.position.x
      y += worldTransform.position.y

      // TODO: transform to WebGL clip coordinates

      transformed.push(new Float32Array([x, y]))
    }

    let buffer = []
    for (let vertIdx of this.faces) {
      buffer = [...buffer, ...transformed[vertIdx]]
    }

    return new Float32Array(buffer)
  }
}

export default Mesh
