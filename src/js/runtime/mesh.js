import Component from './component'
import { Vector2 } from './vectors'
import Game from './game'

class Mesh extends Component {
  constructor (gameObject) {
    super(gameObject)

    this.vertices = [
      new Vector2(0.5, 0.5),
      new Vector2(-0.5, 0.5),
      new Vector2(-0.5, -0.5),
      new Vector2(0.5, -0.5)
    ] // Vector2 array

    this.colors = [] // Color array
    this.faces = [0, 1, 2, 0, 3, 2] // number array indexing this.vertices
    // this.faceSize = 3 // default to triangle
  }

  // as in WebGL clip coordinates
  getVertexArrayBuffer () {
    const transformed = []

    const localTransform = this.gameObject.transform
    const worldTransform = localTransform.toWorldTransform()
    const glTransform = Game.world.transform

    for (let vertex of this.vertices) {
      let x = vertex.x * Math.cos(worldTransform.rotation) - vertex.y * Math.sin(worldTransform.rotation)
      let y = vertex.x * Math.sin(worldTransform.rotation) + vertex.y * Math.cos(worldTransform.rotation)

      x *= worldTransform.scaling.x
      y *= worldTransform.scaling.y

      x += worldTransform.position.x
      y += worldTransform.position.y

      // transform to WebGL clip coordinates

      let x2 = x * Math.cos(glTransform.rotation) - y * Math.sin(glTransform.rotation)
      let y2 = x * Math.sin(glTransform.rotation) + y * Math.cos(glTransform.rotation)

      x2 *= glTransform.scaling.x
      y2 *= glTransform.scaling.y

      x2 += glTransform.position.x
      y2 += glTransform.position.y

      transformed.push(new Float32Array([x2, y2]))
    }

    let buffer = []
    for (let vertIdx of this.faces) {
      buffer = [...buffer, ...transformed[vertIdx]]
    }

    return {
      buffer: new Float32Array(buffer),
      size: 2
    }
  }
}

export default Mesh
