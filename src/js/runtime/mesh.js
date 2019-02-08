import Component from './component'
import { Vector2 } from './vectors'

class Mesh extends Component {
  constructor (gameObject) {
    super(gameObject)

    this.vertices = [
      new Vector2(-0.25, -0.25),
      new Vector2(-0.25, 0.25),
      new Vector2(0.25, 0.25),
      new Vector2(0.25, -0.25),
    ] // Vector2 array

    this.colors = [] // Color array
    this.faces = [0, 1, 2, 2, 0, 3] // number array indexing this.vertices
    // this.faceSize = 3 // default to triangle
  }

  // as in WebGL clip coordinates
  getVertexArrayBuffer () {
    // TODO: calculate vertices from transform (as in clip coordinates)
    const localTransform = this.gameObject.transform
    const worldTransform = localTransform.toWorldTransform()

    let buffer = []
    for (let vertIdx of this.faces) {
      const vertex = this.vertices[vertIdx]
      const res = vertex.mul(1)

      res.x = vertex.x * worldTransform.scaling.x * Math.cos(-localTransform.rotation) - vertex.y * worldTransform.scaling.y * Math.sin(-localTransform.rotation)
      res.y = vertex.x * worldTransform.scaling.x * Math.sin(-localTransform.rotation) + vertex.y * worldTransform.scaling.y * Math.cos(-localTransform.rotation)

      res.x += worldTransform.position.x
      res.y += worldTransform.position.y

      buffer = [...buffer, ...res.flatten()]
    }

    return new Float32Array(buffer)
  }
}

export default Mesh
