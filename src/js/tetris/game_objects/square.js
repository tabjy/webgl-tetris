import { GameObject, Renderer, Mesh } from '../../runtime'
import Rotation from '../behaviors/rotation'

class Square extends GameObject {
  constructor () {
    super()

    this.addComponent(Renderer)
    this.addComponent(Mesh)

    this.addComponent(Rotation)
  }

  setColor (color) {
    const renderer = this.getComponent(Renderer)
    renderer.uniforms.fColor.buffer = color.flatten()
  }
}

export default Square
